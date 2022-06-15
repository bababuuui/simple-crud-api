export function getPostData(req): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      let body = "";

      req.on("data", (chunk) => {
        body += chunk.toString();
      });

      req.on("end", () => {
        resolve(body);
      });
    } catch (e) {
      reject(e);
    }
  });
}

export async function getPostJSONData(req): Promise<any> {
  try {
    const data = await getPostData(req);
    return JSON.parse(data);
  } catch (e) {
    console.log(e);
    return null;
  }
}
