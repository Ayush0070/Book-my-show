import React, {useEffect, useState} from 'react';
import { Table, Button } from 'antd';
// import Movie from '../../api/movie';
import MovieForm from "./MovieForm";
import {HideLoading, ShowLoading} from "../../redux/loaderSlice";
import {getAllMovies} from "../../api/movie";
import { useDispatch } from 'react-redux';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteMovieModal from "./DeleteMovieModal";
import moment from 'moment';

const MovieList = () => {

    const fakeMovies = [
        {
            key: '1',
            poster: "Image1.jpg",
            description: "Movie 1 Description",
            duration: 120,
            genre: "Action",
            language: "English",
            releasedatate: "2024-08-01",
            name: "Movie 1",
        },
        {
            key: '2',
            poster: "Image2.jpg",
            description: "Movie 2 Description",
            duration: 120,
            genre: "Action",
            language: "English",
            releasedatate: "2024-08-01",
            name: "Movie 2",
        },
    ];
    const tableHeadings = [
        { title: "Poster",dataIndex: "poster", render: (text, data) => {
            return(
                <img src={data.poster} alt={data.name} height="100px" style={{objectFit: "cover"}} width="100px"/>
            )
        } },
        { 
            title:"Movie Name",
            dataIndex: "name",
        },
        { 
            title:"Description",
            dataIndex: "description",
        },
        { 
            title:"Duration",
            dataIndex: "duration",
            render:(text) => {return `${text} mins`}
        },
        { 
            title:"Genre",
            dataIndex: "genre",
        },
        { 
            title:"Language",
            dataIndex: "language",
        },
        {
            title:"Release Date",
            dataIndex: "releasedatate",
            render:(text,data) => {
                return moment(data.releasedatate).format("DD-MM-YYYY");
        }},
        {
            title: "Actions",
            render: (text, data) => {
                return (
                    <div>
                        <Button onClick={() =>{
                            setIsModalOpen(true);
                            setSelectedMovie(data);
                            setFormType("edit");
                        }}>
                            <EditOutlined />
                        </Button>
                        <Button danger onClick={() => {
                            setIsDeleteModalOpen(true);
                            setSelectedMovie(data);
                        }}>
                            <DeleteOutlined />
                        </Button>
                    </div>
        )}},
    ];

    const [movies, setMovies] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [formType, setFormType] = useState("add"); // "add" or "edit"
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const dispatch = useDispatch();   

    const getData = async () => {
        dispatch(ShowLoading());
        try {
            const response = await getAllMovies();  
            dispatch(HideLoading());
            if(response && response.success) {
                setMovies(response.data.map(function (item){
                    return {...item, key: `${item._id}`};
                }));
            } else {
                message.error(response.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error("Error fetching movies");
        }   
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div>  
            <Button onClick={() =>{
                setIsModalOpen(true);
                setFormType("add");
            }}>Add Movie</Button> 
            <Table dataSource={movies} columns={tableHeadings}/>
            {isModalOpen && (<MovieForm
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                formType={formType}
                getData={getData}
            />)}
            {isDeleteModalOpen && (<DeleteMovieModal
                isDeleteModalOpen={isDeleteModalOpen}
                setIsDeleteModalOpen={setIsDeleteModalOpen}
                selectedMovie={selectedMovie}
                setSelectedMovie={setSelectedMovie}
                getData={getData}
            />)}
        </div>
    )
}   

export default MovieList;