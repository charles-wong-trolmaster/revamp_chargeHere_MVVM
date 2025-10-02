import React from "react";
import Drawer from "../../DrawerStack/Drawer";
import Create from "../contents/Create";
import { useCreateOneLocationMutation } from "@/redux/rtk-query/endpoints/admin/locations";
import { useDrawer } from "@/hooks/useDrawer";
import { Location } from "@/interfaces";

interface LocationDrawerProps {
  id: string;
  widthMultiplier?: number;
}

const CreateDrawer: React.FC<LocationDrawerProps> = ({
  id,
  widthMultiplier,
}) => {
  const { closeCurrent } = useDrawer();
  const [createLocation] = useCreateOneLocationMutation();
  const onSubmit = async (location: Location) => {
    await createLocation(location)
      .unwrap()
      .then(() => {
        closeCurrent();
      })
      .catch((error) => console.error(error));
  };

  return (
    <Drawer id={id} widthMultiplier={widthMultiplier}>
      <Create drawerId={id} />
    </Drawer>
  );
};

export default CreateDrawer;
