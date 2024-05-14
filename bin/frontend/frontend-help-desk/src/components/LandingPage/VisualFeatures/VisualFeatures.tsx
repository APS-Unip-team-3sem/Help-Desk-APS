import React from "react";
import SectionWrapper from "../SectionWrapper";
import Feature1 from "../../../images/home/Feature-1.svg";
import Feature2 from "../../../images/home/Feature-2.svg";

const VisualFeatures = (): JSX.Element => {
    const features = [
        {
            title: "Interface visual para chamados de tickets",
            desc: "O DeskTail oferece uma interface visual para facilitar a realização de chamados de tickets.",
            img: Feature1
        },
        {
            title: "Visualização de tickets em tempo real",
            desc: "Visualize os tickets em tempo real e otimize o seu trabalho com o DeskTail.",
            img: Feature2
        },
    ];

    return (
        <SectionWrapper>
            <div className="custom-screen text-gray-300">
                <div className="max-w-xl mx-auto text-center">
                    <h2 className="text-gray-50 text-3xl font-semibold sm:text-4xl">
                        Conheça nossos recursos visuais
                    </h2>
                    <p className="mt-3">
                        Veja os recursos visuais que o DeskTail oferece para otimizar o seu trabalho.
                    </p>
                </div>
                <div className="mt-12">
                    <ul className="space-y-8 gap-x-6 sm:flex sm:space-y-0">
                        {features.map((item, idx) => (
                            <li className="flex-1 flex flex-col justify-between border border-gray-800 rounded-2xl" key={idx}
                                style={{
                                    background: "radial-gradient(141.61% 141.61% at 29.14% -11.49%, rgba(203, 213, 225, 0.15) 0%, rgba(203, 213, 225, 0) 57.72%)"
                                }}
                            >
                                <div className="p-8">
                                    <h3 className="text-gray-50 text-xl font-semibold">
                                        {item.title}
                                    </h3>
                                    <p className="mt-3 sm:text-sm md:text-base">
                                        {item.desc}
                                    </p>
                                </div>
                                <div className="pl-8">
                                {/* Adicionar imagens dos dois recursos aqui */}

                                    {/* <img
                                        src={item.img}
                                        className="w-full ml-auto"
                                        alt={item.title}
                                    /> */}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </SectionWrapper>
    );
};

export default VisualFeatures;