import {
    faPlusCircle,
    faSave,
    faWarning,
    faCheckCircle,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Alert, Button, TextInput } from 'flowbite-react'
import { Title } from '../Title/Title'

const Empty = () => (
    <>
        {' '}
        <h2 className="mb-6 text-4xl font-bold"> welcome Rene! </h2>
        <p className="mb-6 text-foreground">
            it looks like you do not have any entities under this organisation
        </p>
        <Button pill gradientMonochrome="pink" className="w-fit">
            Create entity
            <FontAwesomeIcon icon={faPlusCircle} className="ml-4" />{' '}
        </Button>
    </>
)
export const CreateEntity = ({ orgNum }: { orgNum: number }) => {
    if (orgNum < 1) return <Empty />

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <Title>Create an entity </Title>
            <form action="" className="flex w-2/5 flex-col text-black">
                <label htmlFor="name" className="mb-2  text-foreground">
                    {' '}
                    Entity name
                </label>
                <div className="flex w-full items-center justify-between">
                    <TextInput className=" w-full" placeholder="my company" />
                    <FontAwesomeIcon
                        icon={faWarning}
                        className="text-red-400 ml-4 items-center"
                    />
                </div>
                <Alert className="border-red-100 text-red-400 mt-1 mb-3 p-0">
                    A entity name can only contain letters between [A-Z]
                </Alert>

                <label htmlFor="slug" className="mb-2  text-foreground">
                    slug
                </label>
                <div className="mb-6 flex w-full items-center justify-between ">
                    <TextInput
                        disabled
                        id="slug"
                        className=" w-full"
                        placeholder="my-company"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="ml-4 items-center text-green-400"
                    />
                </div>
                <label htmlFor="description" className="mb-2  text-foreground">
                    Description
                </label>
                <div className="mb-6 flex w-full items-center justify-between ">
                    <TextInput
                        id="description"
                        className="w-full"
                        placeholder="a very awesome company"
                    />
                    <FontAwesomeIcon
                        icon={faCheckCircle}
                        className="ml-4 items-center text-green-400"
                    />
                </div>
                <Alert className="border-red-100 text-red-400">
                    <FontAwesomeIcon icon={faWarning} className="" /> Looks like
                    you F*cked some thing up, please do it correct next time
                </Alert>
                <Button
                    disabled
                    pill
                    gradientMonochrome="pink"
                    className="mt-6 w-fit self-end"
                >
                    Save
                    <FontAwesomeIcon icon={faSave} className="ml-4" />{' '}
                </Button>
            </form>
        </div>
    )
}
