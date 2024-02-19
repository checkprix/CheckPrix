import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark,faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
const Notification = (props: Record<string, any>): any => {
  const [toggle, setToggle] = useState<boolean>(false);

  useEffect(() => {
  console.log(props)
    setTimeout(() => {
      setToggle(!toggle);
      setTimeout(()=>{
        props.setTrigger(false);
      },3000)
    }, 3000);
  }, []);

  return (
    <>
      <motion.div
        initial={{ opacity: !toggle ? 0 : 1 }}
        animate={{ opacity: toggle ? 0 : 1 }}
        transition={{
          ease: "linear",
          duration: 0.2,
        }}
        className="absolute top-20 left-5"
      >
        <div className="w-full flex justify-center items-center md:w-64 h-32 rounded-xl shadow-lg p-3">
          <div className="flex flex-col gap-1 justify-center items-center">
            <span>
              <FontAwesomeIcon
                className={`text-3xl ${(props?.status?'text-green-500':'text-red-500')}`}
                icon={(!props?.status?faCircleXmark:faCircleCheck)}
              />
            </span>
            <span className="text-gray-500 break-words text-center">{props.message}</span>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default Notification;
