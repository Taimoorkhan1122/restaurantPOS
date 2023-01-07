import React, { FC } from 'react'

import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
} from '@chakra-ui/react'
import { useRouter } from 'next/router';
import CategoryForm from './CategoryForm';
import MenuForm from './MenuForm';


const FormModal: FC<{ isOpen?: any, onClose?: any }> = ({ isOpen, onClose }) => {
    const { pathname } = useRouter();

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                {pathname == '/Categories' && <CategoryForm onClose={onClose} />}
                {pathname == '/Menu' && <MenuForm onClose={onClose} />}
            </ModalContent>
        </Modal>
    )
}

export default FormModal