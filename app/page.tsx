import LoginGoogle from "./components/login-google";
import SplitContainer from "./components/split-container";
import { fetchProjectInfo } from "@/lib/actions";

const Page = async () => {
    const lists = await fetchProjectInfo();
    if (lists === null) {
      return <div className="w-full h-full flex flex-col items-center justify-center">
        <LoginGoogle/>
      </div>
    } else {
      return <SplitContainer lists={lists}/>
    }
};

export default Page;