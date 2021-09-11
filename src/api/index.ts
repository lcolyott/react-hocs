/**
 * Mocks an async call to inject a script
 * @returns string
 */
async function fetchScriptsAsync(): Promise<string | undefined> {
    var scriptToInject: string | undefined = "InjectedScript";

    let promise = new Promise<string | undefined>((resolve, reject) => {
        console.log("%c Fetching Scripts...", "color: yellow");

        setTimeout(() => {
            resolve(scriptToInject);
        }, 10000);
    });

    return await promise;
};

export { fetchScriptsAsync };