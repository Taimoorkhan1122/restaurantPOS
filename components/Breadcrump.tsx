import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const Breadcrump = ({location}:{location: string}) => {
    const crumps = location.split("/").filter((d) => d.length);

    return (
        <Breadcrumb mx="20px" my="10px" spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
                <BreadcrumbLink as={Link} href={`/`}>Home</BreadcrumbLink>
            </BreadcrumbItem>
            {crumps.map((c) => (
                <BreadcrumbItem key={`breadcrump_${c}`}>
                    <BreadcrumbLink href={`/${c}`}>{c}</BreadcrumbLink>
                </BreadcrumbItem>
            ))}
        </Breadcrumb>
    );
};

export default Breadcrump;
