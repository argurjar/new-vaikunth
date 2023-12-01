import { NavLink } from "react-router-dom";
import { FaBars, FaHome,FaUser } from "react-icons/fa";
import { MdAddCircle, MdOutlineVideoLibrary } from "react-icons/md";
import {BiCaretRight, BiImages} from "react-icons/bi"
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import "./SideBar.css";
import { TiArrowRightOutline } from "react-icons/ti";



const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [apicall, setapicall] = useState(false);

  


  const [Selecttemplates, setSelectTemplates] = useState([]);
 
  useEffect(() => {
    const storedTemplates = localStorage.getItem('Selectedtemplates');
    if (storedTemplates) {
        setSelectTemplates(JSON.parse(storedTemplates));
    }
  }, [apicall]);
  
  const routes = [
    {
      path: "/",
      name: "Dashboard",
      icon: <FaHome />,
    },
    {
      path: "/users",
      name: "Users",
      icon: <FaUser />,
    },
  
    {
      name: " Add Latest Template",
      path: "/AddTemplates",
      icon: <MdAddCircle />,
    },
    {
      name: " Add Latest Feature",
      path: "/AddFeatures",
      icon: <MdAddCircle />,
    },
    {
      path: "/AddSSceneImage",
      name: "demo for dynamic fields",
      icon: <MdOutlineVideoLibrary />,
    },
   
    {
      name: "Add Template",
      path: "/SelectTemplate",
      icon: <MdAddCircle />,
    },
   
  
    {
      name: "All Templates",
      icon: <TiArrowRightOutline />,
      subRoutes: Selecttemplates.map((template) => {
        return {
          path: `/${template.templateName}/${template.name}`,
          name: template.name,
          icon: <BiCaretRight />,
          subRoutes: template.features.map((feature, index) => {
            return {
              path: `/${template.templateName}/${template.name}/${feature.featureName}`,
              name: feature.featureName,
              icon: <BiCaretRight />,
            };
          }),
        };
      }),
    },
   
  ];












  const toggle = () => setIsOpen(!isOpen);
  const toggleapicall = ( ) => setapicall(!apicall)

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container " onClick={toggleapicall}>
        <motion.div
          animate={{
            width: isOpen ? "270px" : "65px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAasAAAB2CAMAAABBGEwaAAAA5FBMVEX///8AAAD/y0jS0tK6uroFBQXg4ODr6+vX19fDw8Po6Oi2trYUFBT5+fn09PTb29vv7++goKAgICDMzMyRkZHBwcFzc3NPT08/Pz8bGxuxsbGHh4coKCiXl5cSEhJZWVl+fn5sbGw3NzcuLi5AQEBISEifn59mZmZLS0uDg4OqqqpWVlZnZ2d4eHiUlJQrKyu4kzX/ykEvJQ0nHwuGayfInzncrz/ywURGOBVSQhiZeizSs2r/00r/4JD/7br/5az/+/HVvYoxIQDBol36zFz/+N//1nPq1qn3xEDGu6PEnDhrVR8vWSL1AAATnElEQVR4nO1diXbbNhaVrF02KdraF1ubJdl0ZLfpNJl20mWWznQ6//8/I4kkcB+IVaSjxNU9J+fEFEiAuMDD2wAWCme8EkqjTtg4dSNyR1BqlEfrznrUbbe8UzcmJwSr4h4vrVM3JEfUGtvFsMhxs5iPSqduVHb4/fh9XqqnbkpO8NubSVGCwfhrf8Mxe5enUzclFzSfFzKiIrz7qtnyl/xN3oAUDMZqog5Yn7qFGVCH9yifujGZMboyUFUszr9ePaP0hrgKnoxM7fBw6mYejTfE1ciGqR36p27osXg7XPUsqfp616y3wlXzIUXJu+du1a+Vwsel+Evz1K09Dm+Eq9pAoGNa9tmP3qXA1vyYKvxqtc5R2iH+H/u7cR3usR6VWtVqNf8B8Ua42ghk1OnPviAgj+hHv1y5U0pVEZPtdW/42AlH3XxeL8Lb4CpAh1JxIHEnzUhfdlwr8BqdPrEHKjuw/7//rhJdiZBcH94vJrd5vF6Mt8FVAX0VY2mJOWHTl5bRIZiFz8tkZgEr7//y/YePHz9889fkalzgbrdeNtq5CsI3wlXZ+BZ06h3pa2p0ew83+KAfvv/06WKPTxc/kpl7dVNc1Hbz8fhXSuONcFUoxRJqoBzJ19iV1xmqarXa7dEoHIeXjb9FREVsfb+7NuuUq7VdgchdV/OCmvsMVuKtcLUb853panap/t1Drra5VPnTtxeAb38Wfs6RpgPeDldG4Iq1yeOBvxCqdmT9ir8GXsHLV2//E3GFQvDhiIUkaJUitEuHu38VqLr49hfxlszLVbMKgEW5eE1+YfUE7dF1t657ohR+rXm8sPZqmYekVwvoBXzVRSC/SY1aBwKYYXkUhn8Xubr4sJn2d1it5p3RdakaOFciYHR/c3fFgfYduT5cRKaBH7ex33appT7eDCY3L4tp5xiNy5+tJjfTTOG05uNqsnwKcWC34VUnNdcHdh/FYPM3n0SuPv4Df5+PWtlCm9dFe8z277zig8m+FnR5v3OfIZG1dO98H8dlbJA+QG9hqO7GtVHlTu9G6J7vRaouPv1AS0xW69Hx8iGw95MUD4FicM5U7CUaeUrFNSslju1eOd4GCFnlQ95XrSxcFYKnmwll64ORq+G8k0GWt4suCAsBNs8+L03wlbqJgmZ81/G6WhPqnrKr2bjareDtDnEz/ZGSgRdEBu7Qb2XQ2xuOXKHcKNo7Ii+FBznpQ0nKxPEpi7dYN9OKsnEVoVltj8LZY6+3nc3+mdIt/tVotDka7WYmPbDqxFWbcuXQeXP6oJ5DE71YTC+dX46BZDIx8zgPrvbtK8Tq3W8pnf2n45ssw9aBqhV9PxeuxHXRQadL9JIM0dsKVs083Tlxxawm79+iLfxbhofK8GhN1WYna1v42i5CqUOf5RDdm0Z3DDP0JlkuR8nV3LhK8NvrTqvCIc8bgDp8B39oHywQwpWLhRUIGq61PZP0aBaPHRkoTAvNnavCz3Ri/ZrHMzUw5AcezRVd30ESmZAEBd0dJRy4KvNs4oxc+UFQY2juRvPuz/98ZLrgp9//W74+4LZRqvl+kLfn1ugPPJ6rgJr5K0uVKLltai6qAUwsznk2rprrogTvv7k4sPXp4sN7uFyZbqeTx04Yfs4Y/vFciSuW5TwZqdtyTOVX0Gacba5ced1tfx9jrAgoFr/78Y/fLz7+8T/yW1z5cuKeLaDB63EVUK5mdnfFLq2XrBKkdFBRxviYLFztMA6vJ1FIWGCrKFw8/LX71+t0G1ls4RRejytB41xYtTppTh4pJaKXH7k6Tsv0y93ZZplKNxRxSHhaFu8anzeG30I7ydGR0KRvYMV04n7MGk2QITtXEdr1ej287YxvR91u9/L2thGG4fX6dndlh86o3qrW6y1vp4s0W7V6npuIDFxVM3AlZC3bmFiJCZ1PiF1AXlydDK/JFXFQFScWcyXxj2dR2JU4c6UDzTG3UO3ipSBL5EqNM1c6YNTcZo9r0piRseQxOHOlBeGqYuyfZIFzrscKb54rjK65c0VtfVMSQJLBl6f9CPhTceVoXxWE/MnixFA68SO/Uj9mtIVPj9flqkC3xRuiWLErMJc8Swny4Cqot6xMv6BlWS4I7M3lV+aKxqHlOzgSNPTVtNrtRrgO7Y7sqbYbjevb2zKODjeumqV293o2n883W1Zd+WnXHVeLtaF+L7zfl1tpHbfNxvN0MRleDW8my/720sZKMXDVxE0Rx5ySQzexaYvOozIyhb1a7t1zb1dl8fRc0gbENkwl2nBHkwNX1bDP4m8bNkGYbd/XVu6zPZbKsel3N2Tbyg6DrZGu1+aKJk7pTKzEJZVS2L3ytJjGZBMq+xszgLhEteVqVx8fF3e8Oc/89qluZvV5OfnMChRH26xCvdx04SoRTkG1HXYee9vxuls1puoQe1i3FMVhjJR741LcCgyPu5TXTtKomPZqyVXjHsr1QYjiQzUWILpBpb6yWzEplONFK15duNpnq/ilzuYFrt31x3UtXTT9TD1w/HisPQrtS++vRyxDWeWkTvZAK66a7/BetB7I0jtTvzA6ACT5W23NcVE7DDSS0IWr4rgzl+XtLm41czcgIQR1rKMbl6COadPxSrtel8gZwhU7J8aGqxDvHBKhT7ybGi0JK0/7q80vpN7G58SVGh313CLx4aWyXLwmESkZCKGiSr+3nT+JMjE9eAlXi+SqmatgoHkuSb/TmOs4r0SufEFKDFfz7XY7fSEXleMgJ640TokaKabyfSQ9gQo7DYDdXzKVLrgmgiR1wpKZK+k+EaIHVcSWEq40sVANVzWSg/II79rA+JEq89XElXodFLFSLQEkffSdolCcvoQpNISqldB1IxxEYiIN4YrZACauSObVPCXWyXql2W+MXNG3xfP/7sSx3YbVRTFrj+Oq0p+Nx/MnOndVGjkNY8kDpUn6Upi+dEBaP6qhuiboW4QrdlSWnityXElFIiUIVxrXJlZO9V4QgJIt6FVIl5CrmQauahKu+p2qH3WdH3RJ7FfxBn0sIx8zSfoSpEigFS1zZZDFhe7pJlyxSaflqkU0ddmAOoYrMuEh/2Qiq6DLf69IR7QzVwNBGLWm+icUhDCWPEcmrbCjRib3OhFdgfQ94WouKy9yRbYQPksVILJeaewrrBxDdihe5Ks29KTUEHXlapvuajw+Ry7hiIIis+VLqduxYpU+Ao4EapYRrmbJVTVXTRxvNyp/JD5UczYDVt4H1kG6KFwCqNvIGuHIlTTBxTQe6KiVZdTGkhROYQQ7RC1v4Kl3uAAQrpgKrOSKzPu+KjeOcKVxlmHlK/4w7GiVExy0W1lHunG1kEoHH0rI5wB5SDoykjyAN6DJtSJN6B81N9TMSOcz9VrFlXAG2vJZrtASFcmSKxD4UMuLyshEjVmiqBq4ErLSFQ4Q6DP5AaXEHk7besm8S18pajewouk2gOuEKzYt5VzJdnouZMvRMVwtmeaP43mmuhXbIpGyTlypNgRgOrSUTmIqDVPDKg6SwdTg0kD5Ynv05RUTrqT7rxKuxIMFE1ytU6LwGK4mbIriyQRK4wyzWyRC0EkGKlsIlsOjtMAcHyMOmWRN5eYndKs2cRVJCeWXeaMlXHUFCxEwFLVB7Clb3YKndaB4U+ateCsolf7ZiStl+0DBXkkLkBcVi8yjy+Ba4Z2t8nNEwIEIk55wxfTOFFeefo/nkqoAx3DFNB4fzTe1pxttyvSq6cKVnIY9QNBW5EkVxGlJiySrDni1uRlgSAAFexgybwhXbBSLXLX00YmiIKwIVxr7CitnNi1xiqrvxcGTfnMXrtTOZdxOIp/hpPuonIzNJPTAcgoMGSYwEEFrt+AqQPWlMtjcltvlcC6yh2qQLVfEYEi4wro1WcXoAEivai7+QPXE96GY3KXvk24gvyzTtbOCfUPYGbV2Pi/NXC1L3ChcjPiaWO/QwAKMKsKVpY+JcYUt0gTHURFML/wuXGnycsCDrLCHiNqOrxq7wYjviRWcqas8APugK70q54qvc6ID36PRQD7yMnG1lj4yBTQr0kp3TlzBrFGcIULU9gX8EA/wjrTss7pKTfMJV0xDII6HBBJZQcsxaUd0dk1MhHwqI+EKB4Dm4A7spEXqV5dYoyZHGtb4oSIhi1gyXF4lQwnVHj68TGnV2HzeB9Zc9aQOJaK0sYaR2zX9jVwx3QJ9phqeyYDWvmwGrvDtFNm1ZFxy/fxRvFBArkz7gLD5XMDbcqVagEm4JVleSD9q4sLIFdN3cKBqxl8Nu1v7srY5ZxKsLIqRLL9k8gWxNUrSUHi3mHb3YPN5wNGSK/X7kO0xcdPIXnVNvgVyxVxZc303JyAJJtqXzcAVOntUyxrpwUSIxCsxdSPyLQums7kxjMCnJqlJem6Moc+I8twXG1VUeWdSt7KjWtHI1Ygnoi2n5HNOebc2XHnoWxzEyng8IYX5w4qZtvfgIObxGiuu9Mn1/fQT8GbNhmbkiqWPoEzRDHkfhW/KcZETV/hFN6UZRnZjNbD6imBGMVEwU1d5AOpX3G6Rc0XzPtJqFgEE1JMJW0xfkgGDdaxJSL2OK1xLUp5Q0z4R5EqTEopcKeUWxgXi14hdmuL0YcmvTwZbGOvlBgkxcRhXxEAyrYQeakuRNMK7NW5K5Cqh1JNMU2mt6Ipz5gr39FhypdaRSPbZvikJe6Kaz+WIwceEazE3wglXrNWEK+PRKGi7R6MPRbjmuCiZ2WvLVbZ5ZckVtkVtv5JUoP17xJykvC5cZdDv+SJizYkr40mhuLpFzMjncArIVdKjZL681npFuNJsS0SuNPoAFtunS98oWu+zamfqhxVUyWUKrkharXHvs4dq+2F249qo+T4nuiiT7vZsbJqCoAemfAqflytcsXfVxb13ky7IxvBSKwTJR2pN84pwZT57B1W3g7qECt69eh0FSm+SxhPZphkmxL5KvbnLmQnZuSIy/6Ewj/4jMeR5b2uiesJRai7zynx+A1mwZvsL6ATXfOMCXBSsRcRrpXGrBhindrWvbLlCeaw7o4xkn8WddydZ5rmtoA5wCjtwVFyxViNXFnu78eEHddS3ux+mEBu1hCud3wLHcmrq5sQVznHdAdBNlKnxajWTFeSGvmZi0S0/Jq5wXlh8TwTldZTWO5E9NQUoxDQ+wpXmhTL5AwlXGj0QudL6hebFFKSvzTtWmU0nfsTBJAORK4uzSIib47C8oVRUKgig6/KWE/1OY9nVcCinfs2JKxw32jgGNUj3UMQm+Qqo9OcIG89cuLLQLUiKRFtsu3JRXsvKEK40/dPEozVTv7qc9WjJld4jQDaN7KFQi6BnFQK+KzyIc0XCfXVpefPh/sTLEvUvyFzVMupBGS5nrbnCOlO/upyhquFqoH8MgJ59xp24KYDOLJ0EZAxSrojOcSxXxKcUTZGR7LEUUAQs/ADtpteKNRKuNM4Re658qhBoklChkIQsLzVBuTAlXLFWO3JFYiCRswgnjVwyozELVRC7yTKG/2pcWeqke9CzwK/UChls2Ult3qXbcCLwpDViGbBWkxntKANn0TVcCKXaxZz/ju5dslFYY9MQJ1zq15zOkba09fagO7ZnmpJIx5gan5eRvj/A5ZTn3ZHgi5wrs25B2pk0E2KGslEGzukrtBpJitGpuUKd3XTWP/G268a3h9bGZMy+9hmMYvl3TfqAR6TILm3WakeuiF84iQNjjGgitj3AwUV6gZiVljlnXwRXWKX+UxQ1ujXgftxZX3fGrEc61AJ4YffhhkfeamninhpExb+VX8W5461x4NBlmOhBM3WdhCtXf6Dt96/Q1DF+Q2OhrRJBfJ4iboWe4y5gsiSyVsu9GUqQ4twOIfZAcT4q7bvUa41m5LqgPxAONOEYUs41fmX7XTmXeQVq2p2pqPi5H6EawhX/FidJnT2WK7ninzY6ZBCVWyIDZ+o6CVeu8Stbrpb6xwhgRS2+HSdR+PaIsjBJ83jCLyGYtZq4pMxckYdgv9VN35K9S3cUGhial9b7A1HISbiw1Nk9uy0KCdi4t/rGSJ2eF7nHNulqtDH5mo1D/4p1MxpMd24xkQFpqEflnYix5K1wkuqqnvNikm30XHrdyWIyMGF03/tF+8F8unpT3Rx5+Q5wUpmueUPRvuXyHRVIsFmh9y2OqkZCxIbWt6LThHXSTKq1eFw6aHPdYE+7hFI+BqXtt3w/1MMtjsWN43H2X9z0m+3b8Wzb267r1KxhphQRPCU2z/s4ANl81ucGRkDZm3bh1Ubz1P7VYb93qYpB+jH1N4bs1ETkP0h9WAkbim1BjIWeLv3L50ck2ny3xevtRv6LWVhaoD3dz+mFMJybs0NPDoQt2qVefzJ5mNscsuyheJWKrVqrPH7sTft7THvP5ZbpDN3eu1nZHDcrdR4fOyVFZ1+u7oqVhZLv7tNukA6fTNpd+WEveG6eLAlolup5fTepVpKdLB2USiXZ2KxZfuUTVzfz1zU+H6ol7THazXrd5jjz5q5zvsYj6uVA9fl1vm9yRl5A/++p23KGHnNOVR4fJDzj9YDpbLl+dPGM3AFuP9M+2DNODJ7Rq0tQPOMLALhJ8/yS6RmvgM1ZAn4t4C55zcbgM74IMP+ScZvWGScG8/HOTt2SMwxgioXphKEzTg0viU2d3YBfPOII0uCYz+id8TlRiyJxd/KPH5zxBaEaRZTnZwv4y8chJ2B6Fn9fA4KleH70GV8sPJuvMr8h/B/S1SGTLOJeLgAAAABJRU5ErkJggg=="
                    alt=""
                    srcSet=""
                    width={"120px"}
                  />
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                    key={index}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className="link"
                  activeclassname="active"
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
