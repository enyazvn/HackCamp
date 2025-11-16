import { FooterButton } from "./FooterButton";

export const Footer = () => {
  return (
    <div className="flex flex-row gap-1.5 items-center justify-center">
        <FooterButton
            title={"Home"}
        />
         <FooterButton
            title={"Likes"}
        />
        <FooterButton
            title={"Matches"}
        />
        <FooterButton
            title={"Profile"}
        />
    </div>
  );
};

