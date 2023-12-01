import { AnimatePresence, motion } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaAngleDown } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const AmenuAnimation = {
  hidden: {
    opacity: 0,
    height: 0,
    padding: 0,
    transition: { duration: 0.2, when: "afterChildren" },
  },
  show: {
    opacity: 1,
    height: "auto",
    transition: {
      duration: 0.3,
      when: "beforeChildren",
    },
  },
};
const AmenuItemAnimation = {
  hidden: (i) => ({
    padding: 0,
    x: "-100%",
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
  show: (i) => ({
    x: 0,
    transition: {
      duration: (i + 1) * 0.1,
    },
  }),
};

const SidebarSub = ({ to, route, showAnimation, isOpen, setIsOpen }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    setIsOpen(true);
  };
  useEffect(() => {
    if (!isOpen) {
      setIsMenuOpen(false);
    }
  }, [isOpen]);

  return (
    <>
      <NavLink to={route.path} key={route.name}>
        {" "}
        <div className="menu link" onClick={toggleMenu}>
          <div className="menu_item">
            <div className="icon">{route.icon}</div>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="link_text1"
                >
                  {route.name}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          {isOpen && (
            <motion.div
              animate={
                isMenuOpen
                  ? {
                      rotate: 0,
                    }
                  : { rotate: -90 }
              }
            >
              <FaAngleDown />
            </motion.div>
          )}
        </div>
      </NavLink>
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            variants={AmenuAnimation}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="menu_container2"
          >
            {route.subRoutes.map((subRoute, i) => {
              if (subRoute.subRoutes) {
                return (
                  <SidebarSub
                    key={subRoute.name}
                    setIsOpen={setIsOpen}
                    route={subRoute}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <motion.div
                  variants={AmenuItemAnimation}
                  key={subRoute.name}
                  custom={i}
                >
                  <NavLink
                    to={subRoute.path}
                    key={subRoute.name}
                    className="link2"
                  >
                    <div className="icon">{subRoute.icon}</div>
                    <motion.div className="link_text2 ">
                      {subRoute.name}
                    </motion.div>
                  </NavLink>
                </motion.div>
              );
            })}
          </motion.div>
        )}{" "}
      </AnimatePresence>
    </>
  );
};

export default SidebarSub;
