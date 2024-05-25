import DefaultLayout from '../layout/DefaultLayout';

const ToDo = () => {
    return (
        <DefaultLayout>
            <>
                <div className="py-3">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-wrap -mx-3 -mb-8">
                            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-8">
                                <div className="max-w-sm mx-auto h-full px-4 pt-6 pb-24 bg-gray-500 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <h3 className="text-lg text-white font-semibold mr-2">A fazer</h3>
                                            <span className="inline-flex items-center justify-center w-6 h-7 rounded-full bg-gray-600 text-xs font-medium text-gray-400">1</span>
                                        </div>
                                        <div>
                                            <button className="inline-block mr-2 text-gray-400 hover:text-gray-300">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.6667 5.33329H6.66675V1.33329C6.66675 1.15648 6.59651 0.986913 6.47149 0.861888C6.34646 0.736864 6.17689 0.666626 6.00008 0.666626C5.82327 0.666626 5.6537 0.736864 5.52868 0.861888C5.40365 0.986913 5.33342 1.15648 5.33342 1.33329V5.33329H1.33341C1.1566 5.33329 0.987035 5.40353 0.86201 5.52855C0.736986 5.65358 0.666748 5.82315 0.666748 5.99996C0.666748 6.17677 0.736986 6.34634 0.86201 6.47136C0.987035 6.59639 1.1566 6.66663 1.33341 6.66663H5.33342V10.6666C5.33342 10.8434 5.40365 11.013 5.52868 11.138C5.6537 11.2631 5.82327 11.3333 6.00008 11.3333C6.17689 11.3333 6.34646 11.2631 6.47149 11.138C6.59651 11.013 6.66675 10.8434 6.66675 10.6666V6.66663H10.6667C10.8436 6.66663 11.0131 6.59639 11.1382 6.47136C11.2632 6.34634 11.3334 6.17677 11.3334 5.99996C11.3334 5.82315 11.2632 5.65358 11.1382 5.52855C11.0131 5.40353 10.8436 5.33329 10.6667 5.33329Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <a className="inline-block py-1 text-gray-400 hover:text-gray-300" href="#">
                                                <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 0.666626C5.73629 0.666626 5.47851 0.744825 5.25924 0.891333C5.03998 1.03784 4.86908 1.24608 4.76816 1.48971C4.66724 1.73335 4.64084 2.00144 4.69229 2.26008C4.74373 2.51872 4.87072 2.7563 5.05719 2.94277C5.24366 3.12924 5.48124 3.25623 5.73988 3.30767C5.99852 3.35912 6.26661 3.33272 6.51025 3.2318C6.75388 3.13088 6.96212 2.95998 7.10863 2.74072C7.25514 2.52145 7.33333 2.26367 7.33333 1.99996C7.33333 1.64634 7.19286 1.3072 6.94281 1.05715C6.69276 0.807102 6.35362 0.666626 6 0.666626ZM1.33333 0.666626C1.06963 0.666626 0.811839 0.744825 0.592574 0.891333C0.373308 1.03784 0.202411 1.24608 0.101495 1.48971C0.000577708 1.73335 -0.0258267 2.00144 0.0256202 2.26008C0.0770672 2.51872 0.204055 2.7563 0.390525 2.94277C0.576995 3.12924 0.814572 3.25623 1.07321 3.30767C1.33185 3.35912 1.59994 3.33272 1.84358 3.2318C2.08721 3.13088 2.29545 2.95998 2.44196 2.74072C2.58847 2.52145 2.66667 2.26367 2.66667 1.99996C2.66667 1.64634 2.52619 1.3072 2.27614 1.05715C2.02609 0.807102 1.68696 0.666626 1.33333 0.666626ZM10.6667 0.666626C10.403 0.666626 10.1452 0.744825 9.92591 0.891333C9.70664 1.03784 9.53574 1.24608 9.43483 1.48971C9.33391 1.73335 9.30751 2.00144 9.35895 2.26008C9.4104 2.51872 9.53739 2.7563 9.72386 2.94277C9.91033 3.12924 10.1479 3.25623 10.4065 3.30767C10.6652 3.35912 10.9333 3.33272 11.1769 3.2318C11.4205 3.13088 11.6288 2.95998 11.7753 2.74072C11.9218 2.52145 12 2.26367 12 1.99996C12 1.64634 11.8595 1.3072 11.6095 1.05715C11.3594 0.807102 11.0203 0.666626 10.6667 0.666626Z" fill="currentColor"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="h-1 w-full mb-4 rounded-full bg-purple-500"></div>
                                    <a className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200" href="#">
                                        <h4 className="text-white font-semibold leading-6 mb-1">
                                            Erro ao logar
                                        </h4>
                                        <div className="flex items-center mb-4">
                                            <span className="h-2 w-2 mr-1 bg-green-400 rounded-full"></span>
                                            <span className="text-xs font-medium text-green-400">ABERTO</span>
                                        </div>
                                        <p className="text-xs text-gray-300 leading-normal mb-10">
                                            Estou com problemas para logar no sistema.
                                        </p>
                                        <div className="pt-4 border-t border-gray-500">
                                            <div className="flex flex-wrap items-center justify-between -m-2">
                                                <div className="w-auto p-2">
                                                    <div className="flex items-center p-2 bg-gray-500 rounded-md">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M9.66675 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M4.3335 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M1.66675 6.33337H12.3334" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M6.3335 9H7.00016" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M7 9V11" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span className="ml-2 text-xs font-medium text-gray-200">25 Mai</span>
                                                    </div>
                                                </div>
                                                <div className="w-auto p-2">
                                                    <div className="flex h-full items-center">
                                                        <span className="w-7 h-7 rounded-full object-cover bg-white justify-center text-center">
                                                            {/* primeira letra do nome do usuario */}
                                                        </span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </a>
                                    
                                    
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-8">
                                <div className="max-w-sm mx-auto h-full px-4 pt-6 pb-24 bg-gray-500 rounded-xl">
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="flex items-center">
                                            <h3 className="text-lg text-white font-semibold mr-2">Em progresso</h3>
                                            <span className="inline-flex items-center justify-center w-6 h-7 rounded-full bg-gray-600 text-xs font-medium text-gray-400">2</span>
                                        </div>
                                        <div>
                                            <button className="inline-block mr-2 text-gray-400 hover:text-gray-300">
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M10.6667 5.33329H6.66675V1.33329C6.66675 1.15648 6.59651 0.986913 6.47149 0.861888C6.34646 0.736864 6.17689 0.666626 6.00008 0.666626C5.82327 0.666626 5.6537 0.736864 5.52868 0.861888C5.40365 0.986913 5.33342 1.15648 5.33342 1.33329V5.33329H1.33341C1.1566 5.33329 0.987035 5.40353 0.86201 5.52855C0.736986 5.65358 0.666748 5.82315 0.666748 5.99996C0.666748 6.17677 0.736986 6.34634 0.86201 6.47136C0.987035 6.59639 1.1566 6.66663 1.33341 6.66663H5.33342V10.6666C5.33342 10.8434 5.40365 11.013 5.52868 11.138C5.6537 11.2631 5.82327 11.3333 6.00008 11.3333C6.17689 11.3333 6.34646 11.2631 6.47149 11.138C6.59651 11.013 6.66675 10.8434 6.66675 10.6666V6.66663H10.6667C10.8436 6.66663 11.0131 6.59639 11.1382 6.47136C11.2632 6.34634 11.3334 6.17677 11.3334 5.99996C11.3334 5.82315 11.2632 5.65358 11.1382 5.52855C11.0131 5.40353 10.8436 5.33329 10.6667 5.33329Z" fill="currentColor"></path>
                                                </svg>
                                            </button>
                                            <a className="inline-block py-1 text-gray-400 hover:text-gray-300" href="#">
                                                <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M6 0.666626C5.73629 0.666626 5.47851 0.744825 5.25924 0.891333C5.03998 1.03784 4.86908 1.24608 4.76816 1.48971C4.66724 1.73335 4.64084 2.00144 4.69229 2.26008C4.74373 2.51872 4.87072 2.7563 5.05719 2.94277C5.24366 3.12924 5.48124 3.25623 5.73988 3.30767C5.99852 3.35912 6.26661 3.33272 6.51025 3.2318C6.75388 3.13088 6.96212 2.95998 7.10863 2.74072C7.25514 2.52145 7.33333 2.26367 7.33333 1.99996C7.33333 1.64634 7.19286 1.3072 6.94281 1.05715C6.69276 0.807102 6.35362 0.666626 6 0.666626ZM1.33333 0.666626C1.06963 0.666626 0.811839 0.744825 0.592574 0.891333C0.373308 1.03784 0.202411 1.24608 0.101495 1.48971C0.000577708 1.73335 -0.0258267 2.00144 0.0256202 2.26008C0.0770672 2.51872 0.204055 2.7563 0.390525 2.94277C0.576995 3.12924 0.814572 3.25623 1.07321 3.30767C1.33185 3.35912 1.59994 3.33272 1.84358 3.2318C2.08721 3.13088 2.29545 2.95998 2.44196 2.74072C2.58847 2.52145 2.66667 2.26367 2.66667 1.99996C2.66667 1.64634 2.52619 1.3072 2.27614 1.05715C2.02609 0.807102 1.68696 0.666626 1.33333 0.666626ZM10.6667 0.666626C10.403 0.666626 10.1452 0.744825 9.92591 0.891333C9.70664 1.03784 9.53574 1.24608 9.43483 1.48971C9.33391 1.73335 9.30751 2.00144 9.35895 2.26008C9.4104 2.51872 9.53739 2.7563 9.72386 2.94277C9.91033 3.12924 10.1479 3.25623 10.4065 3.30767C10.6652 3.35912 10.9333 3.33272 11.1769 3.2318C11.4205 3.13088 11.6288 2.95998 11.7753 2.74072C11.9218 2.52145 12 2.26367 12 1.99996C12 1.64634 11.8595 1.3072 11.6095 1.05715C11.3594 0.807102 11.0203 0.666626 10.6667 0.666626Z" fill="currentColor"></path>
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="h-1 w-full mb-4 rounded-full bg-blue-500"></div>
                                    <a className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200" href="#">
                                        <h4 className="text-white font-semibold leading-6 mb-1">
                                            Sem internet
                                        </h4>
                                        <div className="flex items-center mb-4">
                                            <span className="h-2 w-2 mr-1 bg-yellow-400 rounded-full"></span>
                                            <span className="text-xs font-medium text-yellow-400">EM ANDAMENTO</span>
                                        </div>
                                        <p className="text-xs text-gray-300 leading-normal mb-10">
                                            Estou sem internet em minha casa, preciso de ajuda.
                                        </p>
                                        <div className="pt-4 border-t border-gray-500">
                                            <div className="flex flex-wrap items-center justify-between -m-2">
                                                <div className="w-auto p-2">
                                                    <div className="flex items-center p-2 bg-gray-500 rounded-md">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M9.66675 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M4.3335 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M1.66675 6.33337H12.3334" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M6.3335 9H7.00016" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M7 9V11" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span className="ml-2 text-xs font-medium text-gray-200">22 Mai</span>
                                                    </div>
                                                </div>
                                                <div className="w-auto p-2">
                                                    <div className="flex h-full items-center">
                                                        <span className="w-7 h-7 rounded-full object-cover bg-white justify-center text-center">
                                                            {/* primeira letra do nome do usuario */}
                                                        </span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </a>
                                    <a className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200" href="#">
                                        <h4 className="text-white font-semibold leading-6 mb-1">
                                            E-mail com erro, não consigo enviar
                                        </h4>
                                        <div className="flex items-center mb-4">
                                            <span className="h-2 w-2 mr-1 bg-yellow-400 rounded-full"></span>
                                            <span className="text-xs font-medium text-yellow-400">EM ANDAMENTO</span>
                                        </div>
                                        <p className="text-xs text-gray-300 leading-normal mb-10">
                                            Estou com problemas para enviar e-mails, o que fazer?
                                        </p>
                                        <div className="pt-4 border-t border-gray-500">
                                            <div className="flex flex-wrap items-center justify-between -m-2">
                                                <div className="w-auto p-2">
                                                    <div className="flex items-center p-2 bg-gray-500 rounded-md">
                                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M9.66675 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M4.3335 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M1.66675 6.33337H12.3334" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M6.3335 9H7.00016" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            <path d="M7 9V11" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                        </svg>
                                                        <span className="ml-2 text-xs font-medium text-gray-200">23 Mai</span>
                                                    </div>
                                                </div>
                                                <div className="w-auto p-2">
                                                    <div className="flex h-full items-center">
                                                        <span className="w-7 h-7 rounded-full object-cover bg-white justify-center text-center">
                                                            {/* primeira letra do nome do usuario */}
                                                        </span>
                                                            
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    </a>
                                        </div>
                                </div>
                                <div className="w-full md:w-1/2 lg:w-1/3 px-3 mb-8">
                                    <div className="max-w-sm mx-auto h-full px-4 pt-6 pb-24 bg-gray-500 rounded-xl">
                                        <div className="flex items-center justify-between mb-3">
                                            <div className="flex items-center">
                                                <h3 className="text-lg text-white font-semibold mr-2">Concluído</h3>
                                                <span className="inline-flex items-center justify-center w-6 h-7 rounded-full bg-gray-600 text-xs font-medium text-gray-400">4</span>
                                            </div>
                                            <div>
                                                <button className="inline-block mr-2 text-gray-400 hover:text-gray-300">
                                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M10.6667 5.33329H6.66675V1.33329C6.66675 1.15648 6.59651 0.986913 6.47149 0.861888C6.34646 0.736864 6.17689 0.666626 6.00008 0.666626C5.82327 0.666626 5.6537 0.736864 5.52868 0.861888C5.40365 0.986913 5.33342 1.15648 5.33342 1.33329V5.33329H1.33341C1.1566 5.33329 0.987035 5.40353 0.86201 5.52855C0.736986 5.65358 0.666748 5.82315 0.666748 5.99996C0.666748 6.17677 0.736986 6.34634 0.86201 6.47136C0.987035 6.59639 1.1566 6.66663 1.33341 6.66663H5.33342V10.6666C5.33342 10.8434 5.40365 11.013 5.52868 11.138C5.6537 11.2631 5.82327 11.3333 6.00008 11.3333C6.17689 11.3333 6.34646 11.2631 6.47149 11.138C6.59651 11.013 6.66675 10.8434 6.66675 10.6666V6.66663H10.6667C10.8436 6.66663 11.0131 6.59639 11.1382 6.47136C11.2632 6.34634 11.3334 6.17677 11.3334 5.99996C11.3334 5.82315 11.2632 5.65358 11.1382 5.52855C11.0131 5.40353 10.8436 5.33329 10.6667 5.33329Z" fill="currentColor"></path>
                                                    </svg>
                                                </button>
                                                <a className="inline-block py-1 text-gray-400 hover:text-gray-300" href="#">
                                                    <svg width="12" height="4" viewBox="0 0 12 4" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M6 0.666626C5.73629 0.666626 5.47851 0.744825 5.25924 0.891333C5.03998 1.03784 4.86908 1.24608 4.76816 1.48971C4.66724 1.73335 4.64084 2.00144 4.69229 2.26008C4.74373 2.51872 4.87072 2.7563 5.05719 2.94277C5.24366 3.12924 5.48124 3.25623 5.73988 3.30767C5.99852 3.35912 6.26661 3.33272 6.51025 3.2318C6.75388 3.13088 6.96212 2.95998 7.10863 2.74072C7.25514 2.52145 7.33333 2.26367 7.33333 1.99996C7.33333 1.64634 7.19286 1.3072 6.94281 1.05715C6.69276 0.807102 6.35362 0.666626 6 0.666626ZM1.33333 0.666626C1.06963 0.666626 0.811839 0.744825 0.592574 0.891333C0.373308 1.03784 0.202411 1.24608 0.101495 1.48971C0.000577708 1.73335 -0.0258267 2.00144 0.0256202 2.26008C0.0770672 2.51872 0.204055 2.7563 0.390525 2.94277C0.576995 3.12924 0.814572 3.25623 1.07321 3.30767C1.33185 3.35912 1.59994 3.33272 1.84358 3.2318C2.08721 3.13088 2.29545 2.95998 2.44196 2.74072C2.58847 2.52145 2.66667 2.26367 2.66667 1.99996C2.66667 1.64634 2.52619 1.3072 2.27614 1.05715C2.02609 0.807102 1.68696 0.666626 1.33333 0.666626ZM10.6667 0.666626C10.403 0.666626 10.1452 0.744825 9.92591 0.891333C9.70664 1.03784 9.53574 1.24608 9.43483 1.48971C9.33391 1.73335 9.30751 2.00144 9.35895 2.26008C9.4104 2.51872 9.53739 2.7563 9.72386 2.94277C9.91033 3.12924 10.1479 3.25623 10.4065 3.30767C10.6652 3.35912 10.9333 3.33272 11.1769 3.2318C11.4205 3.13088 11.6288 2.95998 11.7753 2.74072C11.9218 2.52145 12 2.26367 12 1.99996C12 1.64634 11.8595 1.3072 11.6095 1.05715C11.3594 0.807102 11.0203 0.666626 10.6667 0.666626Z" fill="currentColor"></path>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                        <div className="h-1 w-full mb-4 rounded-full bg-green-500"></div>
                                        <a className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200" href="#">
                                            <h4 className="text-white font-semibold leading-6 mb-1">
                                                Problema com a impressora
                                            </h4>
                                            <div className="flex items-center mb-4">
                                                <span className="h-2 w-2 mr-1 bg-red-400 rounded-full"></span>
                                                <span className="text-xs font-medium text-red-400">FECHADO</span>
                                            </div>
                                            <p className="text-xs text-gray-300 leading-normal mb-10">
                                                A impressora não está funcionando, o que fazer?
                                            </p>
                                            <div className="pt-4 border-t border-gray-500">
                                                <div className="flex flex-wrap items-center justify-between -m-2">
                                                    <div className="w-auto p-2">
                                                        <div className="flex items-center p-2 bg-gray-500 rounded-md">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M9.66675 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M4.3335 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M1.66675 6.33337H12.3334" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M6.3335 9H7.00016" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M7 9V11" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                            <span className="ml-2 text-xs font-medium text-gray-200">Abr 3</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-auto p-2">
                                                        <div className="flex h-full items-center">
                                                        <span className="w-7 h-7 rounded-full object-cover bg-white justify-center text-center">
                                                            {/* primeira letra do nome do usuario */}
                                                        </span>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </a>
                                        <a className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200" href="#">
                                            <h4 className="text-white font-semibold leading-6 mb-1">
                                                Erro ao acessar página
                                            </h4>
                                            <div className="flex items-center mb-4">
                                                <span className="h-2 w-2 mr-1 bg-red-400 rounded-full"></span>
                                                <span className="text-xs font-medium text-red-400">FECHADO</span>
                                            </div>
                                            <p className="text-xs text-gray-300 leading-normal mb-10">
                                                Estou com problemas para acessar a página do site.
                                            </p>
                                            <div className="pt-4 border-t border-gray-500">
                                                <div className="flex flex-wrap items-center justify-between -m-2">
                                                    <div className="w-auto p-2">
                                                        <div className="flex items-center p-2 bg-gray-500 rounded-md">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M9.66675 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M4.3335 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M1.66675 6.33337H12.3334" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M6.3335 9H7.00016" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M7 9V11" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                            <span className="ml-2 text-xs font-medium text-gray-200">Abr 17</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-auto p-2">
                                                        <div className="flex h-full items-center">
                                                            <span className="w-7 h-7 rounded-full object-cover bg-white justify-center text-center">
                                                                {/* primeira letra do nome do usuario */}
                                                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </a>
                                        <a className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200" href="#">
                                            <h4 className="text-white font-semibold leading-6 mb-1">
                                                Conta de e-mail bloqueada
                                            </h4>
                                            <div className="flex items-center mb-4">
                                                <span className="h-2 w-2 mr-1 bg-red-400 rounded-full"></span>
                                                <span className="text-xs font-medium text-red-400">FECHADO</span>
                                            </div>
                                            <p className="text-xs text-gray-300 leading-normal mb-10">
                                                Minha conta de e-mail foi bloqueada, o que fazer?
                                            </p>
                                            <div className="pt-4 border-t border-gray-500">
                                                <div className="flex flex-wrap items-center justify-between -m-2">
                                                    <div className="w-auto p-2">
                                                        <div className="flex items-center p-2 bg-gray-500 rounded-md">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M9.66675 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M4.3335 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M1.66675 6.33337H12.3334" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M6.3335 9H7.00016" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M7 9V11" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                            <span className="ml-2 text-xs font-medium text-gray-200">Abr 23</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-auto p-2">
                                                        <div className="flex h-full items-center">
                                                        <span className="w-7 h-7 rounded-full object-cover bg-white justify-center text-center">
                                                            {/* primeira letra do nome do usuario */}
                                                        </span>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </a>
                                        <a className="block p-4 mb-4 bg-gray-600 rounded-xl hover:bg-gray-700 transition duration-200" href="#">
                                            <h4 className="text-white font-semibold leading-6 mb-1">
                                                Usuário não encontrado
                                            </h4>
                                            <div className="flex items-center mb-4">
                                                <span className="h-2 w-2 mr-1 bg-red-400 rounded-full"></span>
                                                <span className="text-xs font-medium text-red-400">FECHADO</span>
                                            </div>
                                            <p className="text-xs text-gray-300 leading-normal mb-10">
                                                Não consigo encontrar o meu usuário no sistema.
                                            </p>
                                            <div className="pt-4 border-t border-gray-500">
                                                <div className="flex flex-wrap items-center justify-between -m-2">
                                                    <div className="w-auto p-2">
                                                        <div className="flex items-center p-2 bg-gray-500 rounded-md">
                                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M11.0001 2.33337H3.00008C2.2637 2.33337 1.66675 2.93033 1.66675 3.66671V11.6667C1.66675 12.4031 2.2637 13 3.00008 13H11.0001C11.7365 13 12.3334 12.4031 12.3334 11.6667V3.66671C12.3334 2.93033 11.7365 2.33337 11.0001 2.33337Z" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M9.66675 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M4.3335 1V3.66667" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M1.66675 6.33337H12.3334" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M6.3335 9H7.00016" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                                <path d="M7 9V11" stroke="#3D485B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </svg>
                                                            <span className="ml-2 text-xs font-medium text-gray-200">Abr 28</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-auto p-2">
                                                        <div className="flex h-full items-center">
                                                        <span className="w-7 h-7 rounded-full object-cover bg-white justify-center text-center">
                                                            {/* primeira letra do nome do usuario */}
                                                        </span>
                                                                </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        </a>
                                            </div>
                                    </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </>
                    </DefaultLayout>
                    )
};

                    export default ToDo;
