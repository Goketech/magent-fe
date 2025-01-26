import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const page = () => {
  return (
    <div className="ml-[201px] flex mt-[86px] justify-center">
      <div>
        <h2 className="text-[24px] font-medium leading[29px]">
          Generate content
        </h2>
        <div className="mt-[36px] bg-[#F6F6F6] rounded-[4px] px-[20px] py-[12px] w-[438px] flex justify-between items-center">
          <p>Connect your X account</p>
          <Button variant="light">Connect</Button>
        </div>
        <div>
          <div>
            <label
              htmlFor="title"
              className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
            >
              Content title
            </label>
            <Input
              className="h-[45px]"
              name="title"
              type="text"
              placeholder="Enter title"
            />
          </div>
          <div>
            <label
              htmlFor="topic"
              className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
            >
              Content topic
            </label>
            <Select name="topic">
              <SelectTrigger className="w-full h-[45px]">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Market research">
                    Market research
                  </SelectItem>
                  <SelectItem value="Consumer psychology">
                    Consumer psychology
                  </SelectItem>
                  <SelectItem value="Digital marketing">
                    Digital marketing
                  </SelectItem>
                  <SelectItem value="Brand strategy">Brand strategy</SelectItem>
                  <SelectItem value="Data analytics">Data analytics</SelectItem>
                  <SelectItem value="Growth hacking">Growth hacking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-between">
            <div>
              <label
                htmlFor="min-frequency"
                className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
              >
                Minimum post frequency
              </label>
              <Select name="min-frequency">
                <SelectTrigger className="w-[209px] h-[45px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0-10">0 - 10 hours</SelectItem>
                    <SelectItem value="10 - 20">10 - 10 hours</SelectItem>
                    <SelectItem value="20 - 30">20 - 30 hours</SelectItem>
                    <SelectItem value="30 - 40">30 - 40 hours</SelectItem>
                    <SelectItem value="40 - 50">40 - 50 hours</SelectItem>
                    <SelectItem value="50 - 60">50 - 60 hours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label
                htmlFor="max-frequency"
                className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
              >
                Maximum post frequency
              </label>
              <Select name="max-frequency">
                <SelectTrigger className="w-[209px] h-[45px]">
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="0-10">0 - 10 hours</SelectItem>
                    <SelectItem value="10 - 20">10 - 10 hours</SelectItem>
                    <SelectItem value="20 - 30">20 - 30 hours</SelectItem>
                    <SelectItem value="30 - 40">30 - 40 hours</SelectItem>
                    <SelectItem value="40 - 50">40 - 50 hours</SelectItem>
                    <SelectItem value="50 - 60">50 - 60 hours</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <label
              htmlFor="style"
              className="block mb-[8px] text-[14px] leading-[21px] mt-[32px]"
            >
              Post style
            </label>
            <Select name="topic">
              <SelectTrigger className="w-full h-[45px]">
                <SelectValue placeholder="Select post style" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="Market research">
                    Market research
                  </SelectItem>
                  <SelectItem value="Consumer psychology">
                    Consumer psychology
                  </SelectItem>
                  <SelectItem value="Digital marketing">
                    Digital marketing
                  </SelectItem>
                  <SelectItem value="Brand strategy">Brand strategy</SelectItem>
                  <SelectItem value="Data analytics">Data analytics</SelectItem>
                  <SelectItem value="Growth hacking">Growth hacking</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Button className="w-full mt-[32px]" variant="main" disabled={true}>
              Generate content
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
