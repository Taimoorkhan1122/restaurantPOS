import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { useRouter } from "next/router";

const Breadcrump = ({location}:{location: string}) => {
    const crumps = location.split("/").filter((d) => d.length);
    console.log(crumps);

    return (
        <Breadcrumb mx="20px" mt="55px" mb="1rem" spacing="8px" separator={<ChevronRightIcon color="gray.500" />}>
            <BreadcrumbItem>
                <BreadcrumbLink href={`/`}>Home</BreadcrumbLink>
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
