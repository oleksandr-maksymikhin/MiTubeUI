import "../../../Styles/MainMenu/MainMenu.scss";

import DefaultMenu from "./DefaultMenu.jsx";

export default function MainMenu({
  user,
  setShowDropdownMenu,
  mainMenuRef,
  selected,
  setSelected,
}) {


  const changeSelected = (component) => {
    setSelected(component);
  };

  return (
    <span className="mainMenu" ref={mainMenuRef}>
      {selected && selected}

      {
        <DefaultMenu
          show={selected ? false : true}
          user={user}
          setSelected={changeSelected}
          setShowDropdownMenu={setShowDropdownMenu}
        />
      }
    </span>
  );
}
