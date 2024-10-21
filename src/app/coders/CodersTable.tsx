"use client"

import { ICoder } from "@/models/coders/coder.model"
import { CoderService } from "@/services/coders.service"
import { useRouter } from "next/navigation"
import CodersForm from "./CodersForm"
import { useState } from "react"

interface IProps {
    data: ICoder[]
}

function CodersTable({ data }: IProps) {
    const [selectedCoder, setSelectedCoder] = useState<ICoder | null>(null);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [nameInputValue, setNameInputValue] = useState<string>("");

    const userCoderService = new CoderService()
    const router = useRouter()

    const handleDelete = async (id: string) => {
        await userCoderService.destroy(id)
        router.refresh()
    }

    const handleEdit = (coder: ICoder) => { //enviar por props le coder que voy a actualizar (boton edit)
        setSelectedCoder(coder);
    }

    const handleNameClick = (coder: ICoder) => {
        setEditingId(coder.id); // Iniciar modo de edición para el nombre
        setNameInputValue(coder.name); // Colocar el valor actual del nombre en el input
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameInputValue(e.target.value); // Actualizar el valor del input en tiempo real
    }

    const handleNameBlur = async (coder: ICoder) => {
        // Ejecutar la actualización del nombre cuando el input pierda el foco
        await userCoderService.update(coder.id, { ...coder, name: nameInputValue });
        setEditingId(null); // Salir del modo de edición
        router.refresh(); // Refrescar la tabla
    }

    const handleKeyPress = async (e: React.KeyboardEvent, coder: ICoder) => {
        if (e.key === "Enter") {
            await handleNameBlur(coder); // Actualizar cuando presiones "Enter"
        }
    }

    return (
        <>
            <CodersForm selectedCoder={selectedCoder} setSelectedCoder={setSelectedCoder} />
            <table className="container-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Avatar</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((coder: ICoder) => (
                        <tr key={coder.id}>
                            <td>{coder.id}</td>
                            <td>
                                {editingId === coder.id ? (
                                    <input
                                        type="text"
                                        value={nameInputValue}
                                        onChange={handleNameChange}
                                        onBlur={() => handleNameBlur(coder)} // Cuando pierde el foco, actualiza
                                        onKeyDown={(e) => handleKeyPress(e, coder)} // Cuando se presiona "Enter", actualiza
                                        autoFocus
                                    />
                                ) : (
                                    <span onClick={() => handleNameClick(coder)}>
                                        {coder.name}
                                    </span>
                                )}
                            </td>
                            <td>{coder.avatar}</td>
                            <td>
                                <button onClick={() => handleEdit(coder)}>Editar</button>
                                <button onClick={() => handleDelete(coder.id)}>Borrar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default CodersTable;
