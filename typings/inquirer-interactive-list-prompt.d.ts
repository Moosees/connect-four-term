declare module "inquirer-interactive-list-prompt" {
  export type Choice = {
    name: string;
    value: string;
    key: string;
  };

  function prompt(options: {
    message: string;
    choices: Choice[];
  }): Promise<string>;

  export default prompt;
}
