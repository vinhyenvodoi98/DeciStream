import Select from "react-tailwindcss-select";
import 'react-tailwindcss-select/dist/index.css'

const DrowdownInput = ({opt, inviteeAddress, setInviteeAdress}: {opt:any, inviteeAddress: any, setInviteeAdress: (value: any) => void}) => {

  const handleChange = (value: any) => {
    setInviteeAdress(value)
  };

  return (
    <div className="mr-2 w-full h-full">
      <Select
        value={inviteeAddress}
        onChange={handleChange}
        options={opt}
        isSearchable={true}
        primaryColor='blue'
      />
    </div>
  );
};

export default DrowdownInput;