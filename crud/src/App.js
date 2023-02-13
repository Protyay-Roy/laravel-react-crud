import "./App.css";
import { useEffect, useState } from "react";
import { TbEdit } from "react-icons/tb";
import { MdDelete } from "react-icons/md";

function App() {
    const [Name, setName] = useState();
    const [ShowName, setShowName] = useState([]);
    const [Toggle, setToggle] = useState(false);
    const [Id, setId] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (Toggle) {
            const updatedItems = ShowName.map((item) => {
                if (item.id === Id) {
                    return { ...ShowName, myName: Name };
                }
                return item;
            });
            setShowName(updatedItems);
            setId("");
            setName("");
            setToggle(false);
        } else {
            const inputData = {
                myName: Name,
                id: new Date().getTime().toString(),
            };
            setShowName([...ShowName, inputData]);
            setName("");
            console.log(ShowName);
        }
    };

    useEffect(() => {
        console.log(ShowName);
    }, [ShowName]);

    const handleDeleteAll = () => {
        setShowName([]);
        setName("");
    };

    const handleDeleteOneItem = (id) => {
        const updateItems = ShowName.filter((item) => {
            return item.id !== id;
        });
        console.log(updateItems);
        setShowName(updateItems);
    };

    const handleUpdate = (id) => {
        setId(id);
        const updateValue = ShowName.find((item) => {
            return item.id === id;
        });
        console.log(updateValue);
        setName(updateValue.myName);
        setToggle(true);
    };

    return (
        <section className="flex justify-center items-center h-[100vh] w-[100vw] bg-slate-200">
            <form onSubmit={handleSubmit} className="w-1/2 h-3/4 bg-white rounded-3xl flex flex-col items-center px-6 space-y-6 drop-shadow-2xl">
                <h2 className="py-3 text-2xl font-semibold">CRUD Operation</h2>
                <div className="flex flex-col w-full justify-center items-start space-y-5">
                    {/* //! Input Field */}
                    <label className=""> Name </label>
                    <input
                        className="w-full py-1 px-2 outline-none focus:outline-2 focus:outline-emerald-500 transition-all ease-in-out duration-500 rounded-sm drop-shadow-md"
                        placeholder="Enter your name"
                        type="text"
                        value={Name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="flex justify-evenly w-full items-center">
                    {/* //! Submit button */}
                    <button
                        className="py-2 px-4 border border-emerald-500 rounded-md hover:bg-emerald-500 hover:text-white transition-all duration-500"
                    >
                        {" "}
                        Submit{" "}
                    </button>
                </div>
                {ShowName && (
                    <div className="flex flex-col justify-center items-center w-full space-y-5 pt-10">
                        {/* //! All names display here */}
                        <div className="h-[300px] overflow-y-auto w-full flex flex-col justify-start items-center space-y-3">
                            {ShowName.map((item) => {
                                return (
                                    <div
                                        key={item.id}
                                        className="w-full bg-emerald-500 flex justify-center items-center"
                                    >
                                        <h2 className=" py-3 px-6 text-white w-full text-center text-3xl font-bold">
                                            My name is {item.myName}
                                        </h2>
                                        <div className="flex justify-center items-center space-x-3 mx-5">
                                            <TbEdit
                                                onClick={() =>
                                                    handleUpdate(item.id)
                                                }
                                                className="text-2xl text-white cursor-pointer"
                                            />
                                            <MdDelete
                                                onClick={() =>
                                                    handleDeleteOneItem(item.id)
                                                }
                                                className="text-2xl text-white cursor-pointer"
                                            />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        <div className="">
                            {/* //! Delete All button */}
                            <button
                                className="py-2 px-4 border border-emerald-500 rounded-md hover:bg-emerald-500 hover:text-white transition-all duration-500"
                                onClick={handleDeleteAll}
                            >
                                Delete All
                            </button>
                        </div>
                    </div>
                )}
            </form>
        </section>
    );
}

export default App;
