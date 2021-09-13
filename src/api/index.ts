/**
 * Mocks an async call to inject a script
 * @returns string
 */
async function fetchScriptsAsync(): Promise<string | undefined> {
    var scriptToInject: string | undefined = "InjectedScript";

    let promise = new Promise<string | undefined>((resolve, reject) => {
        setTimeout(() => {
            resolve(scriptToInject);
        }, 5000);
    });

    return await promise;
};

export { fetchScriptsAsync };