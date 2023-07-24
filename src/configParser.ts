type DataType = "string" | "code" | "number" | undefined;

type ProcessStep = {
  type: "table" | "key" | "value" | "dynamicTable" | "expand" | "static" | "";
  name?: string;
  id?: string;
  indent?: number;
  dataType?: DataType;
  children?: Array<ProcessStep>;
};

const tablePattern = /^\{'([^']+)'\}$/;
const dynamicTablePattern =
  /^\{([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+)\}$/;
const expandPattern =
  /^\(([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+)(?::([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+))?\)$/;
const keyValuePattern =
  /^'([^']+)'\s*=\s*([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+)(?::([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+))?$/;
const dynamicKeyPattern =
  /^([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+)\s*=\s*([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+)(?::([[\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]\w\u4e00-\u9fa5]+))?$/;
const dynamicValuePattern =
  /^([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+)(?::([\w\u4e00-\u9fa5\u3000-\u303F\uff00-\uffef]+))?$/;
const staticValuePattern = /^'([^']+)'$/;

function parseLine(line: string): ProcessStep {
  const step: ProcessStep = {
    type: "",
  };

  if (tablePattern.test(line)) {
    step.type = "table";
    step.name = line.match(tablePattern)![1];
  } else if (dynamicTablePattern.test(line)) {
    step.type = "dynamicTable";
    step.id = line.match(dynamicTablePattern)![1];
  } else if (expandPattern.test(line)) {
    const match = line.match(expandPattern)!;
    step.type = "expand";
    step.id = match[1];
    step.dataType = match[2] as DataType;
  } else if (keyValuePattern.test(line)) {
    const match = line.match(keyValuePattern)!;
    step.type = "key";
    step.name = match[1];
    step.id = match[2];
    step.dataType = match[3] as DataType;
  } else if (dynamicKeyPattern.test(line)) {
    const match = line.match(dynamicKeyPattern)!;
    step.type = "value";
    step.id = match[1];
    step.name = match[2];
    step.dataType = match[3] as DataType;
  } else if (dynamicValuePattern.test(line)) {
    const match = line.match(dynamicValuePattern)!;
    step.type = "value";
    step.id = match[1];
    step.dataType = match[2] as DataType;
  } else if (staticValuePattern.test) {
    const match = line.match(staticValuePattern)!;
    step.type = "static";
    step.id = match[1];
  } else {
    console.log(line);
    throw new Error(`无效的行格式: ${line}`);
  }

  return step;
}

function parseDes(des: string): Array<ProcessStep> {
  const lines = des.split("\n");
  const stack: Array<ProcessStep> = [];
  const result: Array<ProcessStep> = [];

  lines.forEach((line) => {
    const indent = line.search(/\S/);
    const content = line.trim();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    while (stack.length > 0 && stack[stack.length - 1].indent >= indent) {
      stack.pop();
    }

    const parent = stack.length > 0 ? stack[stack.length - 1] : null;
    const step = parseLine(content);

    if (parent) {
      if (!parent.children) {
        parent.children = [];
      }
      parent.children.push(step);
    } else {
      result.push(step);
    }

    step.indent = indent;
    stack.push(step);
  });

  return result;
}

type ProcessObject = ProcessStep[];

// 主函数：将输入数据根据处理过程描述转换为对应的 Lua table 结构
export function processLua(description: string): ProcessObject {
  const des = parseDes(description);
  return des;
}
