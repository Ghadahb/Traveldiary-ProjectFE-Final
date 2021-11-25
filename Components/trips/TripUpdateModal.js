import React from "react";
import {
  Button,
  Modal,
  FormControl,
  Input,
  Center
} from "native-base";
import { useState } from "react";
import tripStore from "../../store/tripStore";
import { observer } from "mobx-react";
import authStore from "../../store/authStore";

const TripUpdateModal = ({Oldtrip}) => {
  const [showModal, setShowModal] = useState(false);

  const [trips, setTrip] = useState({
    name: Oldtrip.name,
    // image: "",
  });

    const handleChange = (event) =>
      setTrip({ ...trip, [event.target.name]: event.target.value });

  //   const handleImage = (event) =>
  //     setTrip({ ...trip, image: event.target.files[0] });

  const handleSubmit = (event) => {
    event.preventDefault();
    tripStore.updateTrip(trips);
    // handleClose();
  };


  const [updatedTrip, setUpdatedTrip] = useState({
      name: Oldtrip.name, 
    }
);
const handleUpdate = (event) => {
  event.preventDefault();
  if (Oldtrip) tripStore.updateTrip(updatedTrip, Oldtrip._id);
  else tripStore.createProduct(updatedTrip);
};
 
  return (
    <Center flex={1} px="3">
      <>
        <Button onPress={() => setShowModal(true)}>Update Trip</Button>
        <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
          <Modal.Content maxWidth="400px">
            <Modal.CloseButton />
            <Modal.Header>Update your Trip</Modal.Header>
            <Modal.Body>
              <FormControl>
                <FormControl.Label>Title</FormControl.Label>

                <Input onChangeText={(name) => setUpdatedTrip({ ...Oldtrip, name })} />
              </FormControl>
              <FormControl mt="3">
                <FormControl.Label>Photo</FormControl.Label>
                <Input
                  name="image"
                  type="file"

                  onChangeText={(image) => setUpdatedTrip({ ...trip, image })}
                />
              </FormControl>
            </Modal.Body>

            <Modal.Footer>
              <Button.Group space={2}>
                <Button
                  variant="ghost"
                  colorScheme="blueGray"
                  onPress={() => {
                    setShowModal(false);
                  }}
                >
                  Cancel
                </Button>
                <Button onPress={handleSubmit}>Save</Button>
              </Button.Group>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </>
    </Center>
  );
};

export default observer(TripUpdateModal);