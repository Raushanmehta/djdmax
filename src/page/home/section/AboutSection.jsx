import { CheckCircle } from "lucide-react";

const AboutSection = () => {
  return (
    <section
      className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors duration-300 "
      style={{
        backgroundImage:
          "url('data:image/svg+xml;charset=utf-8;base64,PHN2ZyB3aWR0aD0iMTg4IiBoZWlnaHQ9IjE4OCIgdmlld0JveD0iMCAwIDE4OCAxODgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik02NyAxMkg3M1YxOUw4MCAxOVYyNUg3M1YzMkg2N1YyNUg2MFYxOUw2NyAxOVYxMlpNMjYuOTQ5NyAxMi44MDc2TDMxLjE5MjQgMTcuMDUwM0wyNi4yNDI2IDIyTDMxLjE5MjQgMjYuOTQ5N0wyNi45NDk3IDMxLjE5MjRMMjIgMjYuMjQyNkwxNy4wNTAzIDMxLjE5MjRMMTIuODA3NiAyNi45NDk3TDE3Ljc1NzQgMjJMMTIuODA3NiAxNy4wNTAzTDE3LjA1MDMgMTIuODA3NkwyMiAxNy43NTc0TDI2Ljk0OTcgMTIuODA3NlpNMTI3LjE5MiAxNy4wNTAzTDEyMi45NSAxMi44MDc2TDExOCAxNy43NTc0TDExMy4wNSAxMi44MDc2TDEwOC44MDggMTcuMDUwM0wxMTMuNzU3IDIyTDEwOC44MDggMjYuOTQ5N0wxMTMuMDUgMzEuMTkyNEwxMTggMjYuMjQyNkwxMjIuOTUgMzEuMTkyNEwxMjcuMTkyIDI2Ljk0OTdMMTIyLjI0MyAyMkwxMjcuMTkyIDE3LjA1MDNaTTE2MyAxMkgxNjlWMTlMMTc2IDE5VjI1SDE2OVYzMkgxNjNWMjVIMTU2VjE5TDE2MyAxOVYxMlpNMTkgNjBWNjdIMTJWNzNIMTlWODBIMjVWNzNIMzJWNjdIMjVWNjBIMTlaTTc0Ljk0OTcgNjAuODA3Nkw3OS4xOTI0IDY1LjA1MDNMNzQuMjQyNiA3MEw3OS4xOTI0IDc0Ljk0OTdMNzQuOTQ5NyA3OS4xOTI0TDcwIDc0LjI0MjZMNjUuMDUwMyA3OS4xOTI0TDYwLjgwNzYgNzQuOTQ5N0w2NS43NTc0IDcwTDYwLjgwNzYgNjUuMDUwM0w2NS4wNTAzIDYwLjgwNzZMNzAgNjUuNzU3NEw3NC45NDk3IDYwLjgwNzZaTTExNSA2MFY2N0gxMDhWNzNIMTE1VjgwSDEyMVY3M0gxMjhWNjdIMTIxVjYwSDExNVpNMTcwLjk1IDYwLjgwNzZMMTc1LjE5MiA2NS4wNTAzTDE3MC4yNDMgNzBMMTc1LjE5MiA3NC45NDk3TDE3MC45NSA3OS4xOTI0TDE2NiA3NC4yNDI2TDE2MS4wNSA3OS4xOTI0TDE1Ni44MDggNzQuOTQ5N0wxNjEuNzU3IDcwTDE1Ni44MDggNjUuMDUwM0wxNjEuMDUgNjAuODA3NkwxNjYgNjUuNzU3NEwxNzAuOTUgNjAuODA3NlpNMzEuMTkyNCAxMTMuMDVMMjYuOTQ5NyAxMDguODA4TDIyIDExMy43NTdMMTcuMDUwMyAxMDguODA4TDEyLjgwNzYgMTEzLjA1TDE3Ljc1NzQgMTE4TDEyLjgwNzYgMTIyLjk1TDE3LjA1MDMgMTI3LjE5MkwyMiAxMjIuMjQzTDI2Ljk0OTcgMTI3LjE5MkwzMS4xOTI0IDEyMi45NUwyNi4yNDI2IDExOEwzMS4xOTI0IDExMy4wNVpNNjcgMTE1VjEwOEg3M1YxMTVIODBWMTIxSDczVjEyOEg2N1YxMjFINjBWMTE1SDY3Wk0xMjcuMTkyIDExMy4wNUwxMjIuOTUgMTA4LjgwOEwxMTggMTEzLjc1N0wxMTMuMDUgMTA4LjgwOEwxMDguODA4IDExMy4wNUwxMTMuNzU3IDExOEwxMDguODA4IDEyMi45NUwxMTMuMDUgMTI3LjE5MkwxMTggMTIyLjI0M0wxMjIuOTUgMTI3LjE5MkwxMjcuMTkyIDEyMi45NUwxMjIuMjQzIDExOEwxMjcuMTkyIDExMy4wNVpNMTYzIDExNVYxMDhIMTY5VjExNUgxNzZWMTIxSDE2OVYxMjhIMTYzVjEyMUgxNTZWMTE1SDE2M1pNMTkgMTU2VjE2M0gxMlYxNjlIMTlWMTc2SDI1VjE2OUgzMlYxNjNIMjVWMTU2SDE5Wk03NC45NDk3IDE1Ni44MDhMNzkuMTkyNCAxNjEuMDVMNzQuMjQyNiAxNjZMNzkuMTkyNCAxNzAuOTVMNzQuOTQ5NyAxNzUuMTkyTDcwIDE3MC4yNDNMNjUuMDUwMyAxNzUuMTkyTDYwLjgwNzYgMTcwLjk1TDY1Ljc1NzQgMTY2TDYwLjgwNzYgMTYxLjA1TDY1LjA1MDMgMTU2LjgwOEw3MCAxNjEuNzU3TDc0Ljk0OTcgMTU2LjgwOFpNMTE1IDE1NlYxNjNIMTA4VjE2OUgxMTVWMTc2SDEyMVYxNjlIMTI4VjE2M0gxMjFWMTU2SDExNVpNMTcwLjk1IDE1Ni44MDhMMTc1LjE5MiAxNjEuMDVMMTcwLjI0MyAxNjZMMTc1LjE5MiAxNzAuOTVMMTcwLjk1IDE3NS4xOTJMMTY2IDE3MC4yNDNMMTYxLjA1IDE3NS4xOTJMMTU2LjgwOCAxNzAuOTVMMTYxLjc1NyAxNjZMMTU2LjgwOCAxNjEuMDVMMTYxLjA1IDE1Ni44MDhMMTY2IDE2MS43NTdMMTcwLjk1IDE1Ni44MDhaIiBmaWxsPSIjZTllOWU5Ii8+Cjwvc3ZnPgo=')",
        backgroundSize: "200px 200px",
      }}
    >
      {/* Gradient Overlay Bottom */}
      {/* <div className="absolute  bottom-0 left-0 w-full h-200 
      dark:bg-gradient-to-t from-[#030712] to-transparent"></div> */}

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 
      items-center max-w-[1350px] mx-auto">
        {/* Left Text */}
        <div className="backdrop-blur-sm p-8 rounded-xl h-full">
          <h2 className="  text-2xl md:text-3xl font-bold mb-4">
            DJ DMAX LIVE  MUSIC FESTIVAL <br /> 2025
          </h2>

          {/* Experience */}
          <div className="flex items-center gap-2 mb-6">
            <CheckCircle className="text-orange-500 w-5 h-5" />
            <p className=" font-semibold">8 Years Experience in EDM Industry</p>
          </div>

          {/* Features List */}
          <div className="space-y-3">
            {[
              "Premium Sound Experience",
              "World-Class Visual Production",
              "Exclusive Backstage Access",
              "Fan Meet & Greet Events",
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle className="text-orange-500 w-4 h-4" />
                <p className="text-gray-400 text-sm">{item}</p>
              </div>
            ))}
          </div>

          {/* Learn More Button */}
          <div className="mt-8">
            <button className="px-6 py-3 
            font-semibold rounded-lg shadow-md  bg-gradient-to-r from-[#ff9a3c] to-[#ff5a1f] hover:bg-none hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 transition 
            duration-300">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="relative">
          <img
            src="https://s11234.pcdn.co/wp-content/uploads/2021/10/image4-1-640x427.jpeg"
            alt="Martin Garrix Live"
            className="rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
