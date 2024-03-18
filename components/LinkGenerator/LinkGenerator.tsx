'use client'

import { FunctionComponent, useState } from 'react'

export const LinkGenerator: FunctionComponent = () => {
    const [team, setTeam] = useState<string | undefined>(undefined)
    const [name, setName] = useState<string | undefined>(undefined)

    return (
        <div className="flex w-full flex-col items-center justify-center">
            <label htmlFor="fname" className="mb-3 text-foreground">
                First name:
            </label>
            <input
                type="text"
                id="fname"
                name="fname"
                onChange={(e) => setName(e.target.value.trim())}
            />

            <label htmlFor="team" className="my-3 text-foreground ">
                {' '}
                which team will he/she join?
            </label>
            <select
                name="team"
                id="team"
                onChange={(e) => setTeam(e.target.value)}
            >
                <option value="snails">turbo Snails</option>
                <option value="bees">Bees</option>
                <option value="ducks">Ducks</option>
            </select>

            {name?.length && name.length > 0 && team ? (
                <>
                    <p className="mt-6 text-foreground">your link: </p>
                    <a
                        href={`/onboarding?name=${name}&team=${team}`}
                        className="text-foreground"
                    >{`/onboarding?name=${name}&team=${team}`}</a>
                </>
            ) : null}
        </div>
    )
}
