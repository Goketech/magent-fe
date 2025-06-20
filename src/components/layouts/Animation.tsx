interface AnimationProps {
  className?: string; 
}

const Animation:React.FC<AnimationProps> = ({className}) => {
  
  return (
    <div className={`${className}  flex items-center justify-center w-full h-full`}>

    <div className={` p-6 flex gap-0 justify-center`}>
      
      <div>
        <div
        className="w-[70px] h-[40px] bg-[#6212EC]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      <div
        className="w-[70px] h-[40px] bg-[#6212EC]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      <div
        className="w-[70px] h-[40px] bg-[#6212EC] opacity-[80%]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      <div
        className="w-[70px] h-[40px] bg-[#6212EC] opacity-[40%]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      </div>
      <div>
        <div
        className="w-[70px] h-[40px] bg-[#D9D9D9] opacity-20 -rotate-[60deg] mt-[3.15rem] -ml-[1.1rem]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      </div>
      <div>
        <div
        className="w-[70px] h-[40px] bg-[#D9D9D9] opacity-10 -rotate-[60deg] mt-[4.49rem] -ml-[2.2rem]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      </div>
      <div>
        <div
        className="w-[70px] h-[40px] bg-[#D9D9D9] opacity-10 -rotate-[60deg] mt-[0.8rem] -ml-[2.2rem]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      <div
        className="w-[70px] h-[40px] bg-[#D9D9D9] opacity-10 -rotate-[60deg] mt-[2.35rem] -ml-[2.2rem]"
        style={{
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
        }}
      ></div>
      </div>
      
    </div>
    </div>
  );
};

export default Animation;
