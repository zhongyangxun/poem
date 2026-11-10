import process from "node:process";

const getSentence = async () => {
  try {
    const response = await fetch("https://v2.jinrishici.com/sentence", {
      headers: { "X-User-Token": process.env["POEM_KEY"] || "" },
    });

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }

    const res = await response.json();

    return res.data;
  } catch (error) {
    console.error("❌ 请求失败:", error);
    throw error;
  }
};

export default getSentence;
