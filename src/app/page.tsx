import { CoderService } from "@/services/coders.service";
import CodersTable from "./coders/CodersTable";

const useCoderService = new CoderService()

export default async function Home() {
  const coders = await useCoderService.findAll()
  console.log(coders)
  return (

    <>
      <CodersTable data={coders}/>

    </>
   
  );
}
