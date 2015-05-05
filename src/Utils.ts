/// <reference path="references.ts" />

module BlackScreen {
    export class Utils {
        static log(...args: any[]): void {
            this.delegate('log', args);
        }

        static error(...args: any[]): void {
            this.delegate('error', args);
        }

        static filesIn(directory: string, callback: (files: string[]) => any): void {
            fs.exists(directory, (pathExists: boolean) => {
                if (!pathExists) {
                    return;
                }

                fs.stat(directory, (error, pathStat) => {
                    if (!pathStat.isDirectory()) {
                        return;
                    }

                    fs.readdir(directory, (error, files) => {
                        if (error) {
                            return;
                        }

                        callback(files);
                    })
                });
            });
        }

        private static delegate(name: string, args: Array<any>): void {
            if ((<any>window)['DEBUG']) {
                (<any>console)[name](...args);
            }
        }
    }
}
