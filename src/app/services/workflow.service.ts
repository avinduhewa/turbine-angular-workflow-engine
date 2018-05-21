import { Injectable } from '@angular/core';

declare var $;

@Injectable()
export class WorkflowService {

  constructor() { }

  public getWorkflow(instanceID, index, global) {

    const state = {
      countCharacters: true,
      truncate: true,
      append: true,
      modify: false,
      replace: false
    };
    const start = 'append';

    const report = (...args) => {
      console.log(args);
      return true;
    }

    let workflow = {
      name: 'DocumentProcessing - ' + instanceID,
      logLevel: 'TRACE',
      queries: {
        countCharacters: () => {
          // if (state.countCharacters)
          //   return true;
          global.count[index].disabled = true;
          global.count[index].status = 'started ...'
          global.count[index].status = 'Number of characters :' + global.count[index].text.length;
          return true;
        },
        truncate: () => {
          // if (state.truncate)
          //   return true;
          let truncateValue = Math.floor(Math.random() * Math.floor(global.count[index].text.length));
          // if (truncateValue == 15) {
          //   return false;
          // }
          global.count[index].text = global.count[index].text.slice(1, truncateValue);
          global.count[index].status = 'Number of characters :' + global.count[index].text.length;
          return true;
          // do something
        },
        append: () => {
          // if (state.append)
          //   return true;
          global.count[index].text += ' This is a total new addition to the existing content ';
          global.count[index].status = 'Number of characters :' + global.count[index].text.length;
          return true;
          // do something
        },
        modify: () => {
          // if (state.modify)
          //   return true;
          global.count[index].text = global.count[index].text.toUpperCase();
          global.count[index].status = 'Number of characters :' + global.count[index].text.length;
          return true;
          // do something
        },
        replace: () => {
          // if (state.replace)
          //   return true;
          global.count[index].text = global.count[index].text.replace('E', '15');
          global.count[index].status = 'Number of characters :' + global.count[index].text.length;
          global.count[index].status = 'Workflow completed successfully';

          return true;
          // do something
        },
        error: () => {
          global.count[index].status = 'WORKFLOW FAILED';
          global.count[index].disabled = false;
          return true;
          // do something
        }
      },
      shortcuts: {
        start: start
      },
      workflow: {
        start: {
          no: {
            // publish: {
            //   message: `${instanceID}|countCharacters`
            // },
            // waitFor: `${instanceID}|countCharacters|done`,
            then: 'countCharacters'
          }
        },
        countCharacters: {
          yes: {
            delay: {
              for: 1500,
              then: 'truncate'
            }
          },
          no: {
            then: 'error'
          }
        },
        truncate: {
          yes: {
            delay: {
              for: 1500,
              then: 'append'
            }
          },
          no: {
            then: 'error'
          }
        },
        append: {
          yes: {
            delay: {
              for: 1500,
              then: 'modify'
            }
          },
          no: {
            then: 'error'
          }
        },
        modify: {
          yes: {
            delay: {
              for: 1500,
              then: 'replace'
            }
          },
          no: {
            then: 'error'
          }
        },
        replace: {
          yes: {
            delay: {
              for: 1500,
              then: 'stop.'
            }
          },
          no: {
            then: 'error'
          }
        },
        error: {
          yes: {
            delay: {
              for: 1000,
              then: 'stop.'
            }
          },
          no: {
            then: 'stop.'
          }
        }

      },
      timeout: {
        after: 30000,
        publish: {
          message: 'Globabl timeout'
        },
        then: 'stop.'
      },
      report: report
    };

    return workflow;
  }

}
