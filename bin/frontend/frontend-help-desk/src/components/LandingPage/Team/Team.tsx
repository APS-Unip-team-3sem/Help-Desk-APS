import React from 'react';
import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';

const Team: React.FC = () => {
    return (
        <div  id="team" className="flex items-center justify-center min-h-screen py-48">
            <div className="flex flex-col">
                <div className="flex flex-col mt-3">
                    <div className="container max-w-7xl px-4">
                        <div className="flex flex-wrap justify-center text-center mb-24">
                            <div className="w-full lg:w-6/12 px-4">
                                <h1 className="text-gray-900 text-4xl font-bold mb-8">
                                    Nossa Equipe
                                </h1>
                                <p className="text-gray-700 text-lg font-light">
                                    Conheça a equipe que está por trás de tudo isso. 
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap">
                            <TeamMember
                                name="Letícia Milan"
                                title="Dev Fullstack & Data Scientist"
                                imageSrc="https://media.licdn.com/dms/image/D4D03AQH9F2VpYFHzzg/profile-displayphoto-shrink_400_400/0/1696355731013?e=1720656000&v=beta&t=r3hP1crVBRqKMRih_JIdlXLmPMWrOTO9aFgikZLQNOw"
                                socialLinks={{
                                    linkedin: 'https://www.linkedin.com/in/leticia-milan/',
                                    github: 'https://github.com/LeticiaMilan',
                                    instagram: 'https://www.instagram.com/leth_milan/'
                                }}
                            />
                            <TeamMember
                                name="Christian Sousa"
                                title="Dev Back-end & Systems Analyst"
                                imageSrc="https://media.licdn.com/dms/image/D4D03AQFi9M3N9D3_vg/profile-displayphoto-shrink_400_400/0/1676490060979?e=1720656000&v=beta&t=dFbSTpIM7ZgrznGpSioJUbD0nwjM-HeU22bRdFRlx70"
                                socialLinks={{
                                    linkedin: 'https://www.linkedin.com/in/christian-henrique-866762208/',
                                    github: 'https://github.com/ChristianHSousa',
                                    instagram: '#'
                                }}
                            />
                            <TeamMember
                                name="Malu Martins"
                                title="Dev Back-end"
                                imageSrc="https://media.licdn.com/dms/image/D4D03AQHHnpFnJN9Yyw/profile-displayphoto-shrink_400_400/0/1703335374135?e=1720656000&v=beta&t=a0a3H_VNAvEzA-rJWr0zHkMLZ-DqO-f2xoXs-ftg7Qk"
                                socialLinks={{
                                    linkedin: 'https://www.linkedin.com/in/malu-martins/',
                                    github: 'https://github.com/MaluMartins',
                                    instagram: 'https://www.instagram.com/malwookiee/'
                                }}
                            />
                            <TeamMember
                                name="Antônio Oliveira"
                                title="Dev Back-end & Data Analyst"
                                imageSrc="https://avatars.githubusercontent.com/u/150481966?v=4"
                                socialLinks={{
                                    linkedin: 'https://www.linkedin.com/in/antonio-marcos-oliveira/',
                                    github: 'https://github.com/TonnyThe2nd',
                                    instagram: 'https://www.instagram.com/web_4ntonio/'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface TeamMemberProps {
    name: string;
    title: string;
    imageSrc: string;
    socialLinks: {
        linkedin: string;
        github: string;
        instagram: string;
    };
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, title, imageSrc, socialLinks }) => {
    return (
        <div className="w-full md:w-6/12 lg:w-3/12 mb-6 px-6 sm:px-6 lg:px-4">
            <div className="flex flex-col">
                <a href="#" className="mx-auto">
                    <img
                        className="rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 w-100"
                        src={imageSrc}
                        alt={name}
                    />
                </a>
                <div className="text-center mt-6">
                    <h1 className="text-indigo-100 text-xl font-bold mb-1">{name}</h1>
                    <div className="text-gray-700 font-light mb-2">{title}</div>
                    <div className="flex items-center justify-center">
                        <a href={socialLinks.linkedin} className="flex rounded-full bg-indigo-50  hover:bg-indigo-700 hover:text-indigo-50 h-10 w-10 mx-1" target="blanc">
                            <FaLinkedin className="text-indigo-500 mx-auto mt-3 text-xl" />
                        </a>
                        <a href={socialLinks.github} className="flex rounded-full bg-indigo-50 hover:bg-indigo-700 hover:text-indigo-50 h-10 w-10 mx-1" target="blanc">
                            <FaGithub className="text-indigo-500 mx-auto mt-3 text-xl" />
                        </a>
                        <a href={socialLinks.instagram} className="flex rounded-full bg-indigo-50 hover:bg-indigo-700 hover:text-indigo-50 h-10 w-10 mx-1" target="blanc">
                            <FaInstagram className="text-indigo-500 mx-auto mt-3 text-xl" />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Team;