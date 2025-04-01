import LoginGoogle from "./components/login-google";
import SplitContainer from "./components/split-container";
import { fetchProjectInfo } from "@/lib/actions";

const Page = async () => {
  try {
    const lists = await fetchProjectInfo();
    return <SplitContainer lists={lists}/>
  } catch (error) {
    console.error("Error fetching project info:", error);
    return <div className="w-full h-full flex flex-col items-center justify-center">
    <LoginGoogle/>
  </div>
  }
};

export default Page;