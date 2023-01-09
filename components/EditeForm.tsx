import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalOverlay } from "@chakra-ui/react";
import { useState } from "react";
import Multistep from "./RestaurantForm";

export default function EditForm({
    isOpen = false,
    onClose,
    title,
}: {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}) {
    const OverlayOne = () => (
        <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px) hue-rotate(0deg)" />
    );

    const [overlay, setOverlay] = useState(<OverlayOne />);

    return (
        <>
            <Modal closeOnOverlayClick={false} isCentered isOpen={isOpen} onClose={onClose}>
                {overlay}
                <ModalContent w="95vw">
                    <ModalCloseButton />
                    <ModalBody display="flex" alignItems="flex-end">
                        <Multistep closeModal={onClose} />
                    </ModalBody>
                    {/* <ModalFooter>
                        <Button onClick={onClose}>Close</Button>
                    </ModalFooter> */}
                </ModalContent>
            </Modal>
        </>
    );
}
