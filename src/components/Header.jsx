export const Header = () => {
  return (
    <nav id="header" className="bg-neutral-950 text-white">
      <div className="container w-full mx-auto flex flex-wrap items-center justify-between mt-0 py-2">
        <div className="logo-wrapper flex items-center">
          <img src={"/"} alt="logo" />
        </div>
        <div className="nav-menu-wrapper flex items-center justify-between space-x-10">
          <div>Home</div>
          <div>About</div>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <div>Cart</div>
          <div>Log In</div>
          <div>Sign Up</div>
        </div>
      </div>
    </nav>
  );
};
