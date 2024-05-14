import { SetStateAction, useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useNavigate } from 'react-router-dom';
// import userThree from '../images/user/user-03.png';

const TicketForm = () => {
    const [content, setContent] = useState('');
    const navigate = useNavigate();

    const handleEditorChange = (content: SetStateAction<string>) => {
        setContent(content);
    };
    const handleSubmit = (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        // Logic to handle form submission
    
        const ticketCode = 'CODIGO_DO_TICKET_GERADO';
        // After form submission, redirect the user to the ticket page
        navigate(`/ticket/${ticketCode}`); // Replace '123' with the actual ticket ID
    };

    const handleImageUpload = (blobInfo: { blob: () => Blob; filename: () => string | undefined; }, success: (arg0: any) => void, failure: (arg0: string) => void) => {
        const formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
    
        fetch('YOUR_IMAGE_UPLOAD_ENDPOINT_URL', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            const imageUrl = data.imageUrl;
            success(imageUrl);
        })
        .catch(() => {
            failure('Erro ao fazer upload da imagem');
        });
    };

    return (
        <div className="mx-auto max-w-270">
            <div className="grid grid-cols-5 gap-8">
                <div className="col-span-5 xl:col-span-3">
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
                            <h3 className="font-medium text-black dark:text-white">
                                Abrir chamado de ticket
                            </h3>
                        </div>
                        <div className="p-7">
                            <form onSubmit={handleSubmit}>
                                    
                                

                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="Title"
                                    >
                                        Assunto
                                    </label>
                                    <input
                                        className="w-full rounded border border-stroke bg-gray py-3 px-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                        type="text"
                                        name="Title"
                                        id="Title"
                                        placeholder="Assunto do ticket"
                                        defaultValue=""
                                    />
                                </div>

                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="Priority"
                                    >
                                        Prioridade
                                    </label>
                                    <div className="relative">
                                        <span className="absolute left-4.5 top-4">
                                            {/* icon alerta */}
                                            <svg
                                                className="fill-current"
                                                width="20"
                                                height="20"
                                                viewBox="0 0 20 20"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <g opacity="0.8">
                                                    <path
                                                        fillRule="evenodd"
                                                        clipRule="evenodd"
                                                        d="M10 1.66663C5.30467 1.66663 1.66634 5.30496 1.66634 10.0003C1.66634 14.6956 5.30467 18.3333 10 18.3333C14.6953 18.3333 18.3337 14.695 18.3337 10.0003C18.3337 5.30496 14.6953 1.66663 10 1.66663ZM10 16.6666C6.134 16.6666 3.33301 13.8656 3.33301 10.0003C3.33301 6.1343 6.134 3.33331 10 3.33331C13.866 3.33331 16.667 6.1343 16.667 10.0003C16.667 13.8656 13.866 16.6666 10 16.6666ZM9.16634 5.83331C9.16634 5.59731 9.29734 5.38131 9.49734 5.24731C9.69734 5.11331 9.94634 5.08331 10.1663 5.16664C10.3863 5.24997 10.5 5.42997 10.5 5.63331V10.0003C10.5 10.2036 10.3863 10.3836 10.1663 10.4666C9.94634 10.5499 9.69734 10.5199 9.49734 10.3859C9.29734 10.2519 9.16634 10.0359 9.16634 9.79998V5.83331ZM10.833 12.5H9.16634V13.3333H10.833V12.5Z"
                                                        fill=""
                                                    />
                                                </g>
                                            </svg>
                                        </span>
                                        <select
                                            className="w-full rounded border border-stroke bg-gray py-3 pl-11.5 pr-4.5 text-black focus:border-primary focus-visible:outline-none dark:border-strokedark dark:bg-meta-4 dark:text-white dark:focus:border-primary"
                                            name="Priority"
                                            id="Priority"
                                        >
                                            <option value="Baixa">Baixa</option>
                                            <option value="Média">Média</option>
                                            <option value="Alta">Alta</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="mb-5.5">
                                    <label
                                        className="mb-3 block text-sm font-medium text-black dark:text-white"
                                        htmlFor="Description"
                                    >
                                        Descrição
                                    </label>
                                    <Editor
                                        apiKey="vgytlgm8g0vpt0vm503rbtv2jrs3lzyu9db53aaso1cho92b"
                                        initialValue=""
                                        value={content}
                                        init={{
                                            height: 300,
                                            menubar: false,
                                            plugins: [
                                                'advlist autolink lists link image charmap print preview anchor',
                                                'searchreplace visualblocks code fullscreen',
                                                'insertdatetime media table paste code help wordcount'
                                            ],
                                            toolbar:
                                                'undo redo | formatselect | bold italic | \
                                                alignleft aligncenter alignright alignjustify | \
                                                bullist numlist outdent indent | removeformat | help',
                                            images_upload_url: 'YOUR_IMAGE_UPLOAD_ENDPOINT_URL',
                                            images_upload_handler: handleImageUpload
                                        }}
                                        onEditorChange={handleEditorChange}
                                    />
                                </div>

                                <div className="flex justify-end gap-4.5">
                                    <button
                                        className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                                        type="submit"
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className="flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                                        type="submit"
                                    >
                                        Enviar
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TicketForm;