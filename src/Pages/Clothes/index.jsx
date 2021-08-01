import { useEffect, useState } from 'react'
import { changeClothes, deleteClothe, getClothes } from '../../api'
import cls from './Clothes.module.css'
import {AiOutlineEdit , AiFillDelete} from 'react-icons/ai'
import { arrayFunc, singleArray } from '../../Components/ArrayFunc'

const Clothes = () => {
    const [filter , setFilter] = useState('всему')
    const [showFilter , setShowFilter] = useState(false)
    const showFilterBtn = () => setShowFilter(!showFilter)
    const [filterArray , setFilterArray] = useState([])
    const [base , setBase] = useState([])
    const [searchInput , setSearchInput] = useState('')
    const [template , setTemplate] = useState(false)
    const [showSize , setShowSize] = useState(false)
    const showSizeBlock = () => setShowSize(!showSize)
    const [chooseState , setChooseState] = useState(false)
    const chooseStateBtn = () => setChooseState(!chooseState)
    const [newSize , setNewSize] = useState('S')
    const [newStateOfClothe , setNewStateOfClothe] = useState('Новая')

    const [newName , setNewName] = useState('')
    const [newImg , setNewImg] = useState('')
    const [newContent , setNewContent] = useState('')
    const [newPrize , setNewPrize] = useState('')

    const [clotheId , setClotheId] = useState('')

    const setChangeTemplate = e => {
        setTemplate(!template)
        setClotheId(e)
    }

    const sendSingleClothe = e => {
        e.preventDefault();
        if(newName !== '' && newPrize !== '' && newContent !== '' && newImg !== ''){
            changeClothes({
                name: newName,
                price: newPrize,
                img: newImg,
                content: newContent,
                size: newSize,
            } , 'products/' , `${clotheId}.json` , '')
            .then(() => {
                setNewName('')
                setNewPrize('')
                setNewContent('')
                setNewImg('')
                setNewSize('S')
                setFilter('всему')
            })
        }else{
            alert("Заполните поля ввода!")
        }
    }

    getClothes('categories.json' , '' , '')
    .then(res => res.json())
    .then(r => {
        const categoryArray = singleArray(r)
        setFilterArray(categoryArray)
    })

    const [refresh , setRefresh] = useState(false)

    const deleteClotheses = e => {
        deleteClothe('products/' , `${e}.json` , ``)
        .then(() => setRefresh(!refresh))
    }

    useEffect(() => {
        getClothes('products.json' , '' , '')
        .then(res => res.json())
        .then(r => {
            const data = arrayFunc(r)
            if(filter === 'всему'){
                const generalSearch = data.filter(item => item.name.toUpperCase().includes(searchInput.toUpperCase()))
                setBase(generalSearch)
            }else{
                const filteredArray = data.filter(item => item.category === filter)
                const newFilteredArray = filteredArray.filter(item => item.name.toUpperCase().includes(searchInput.toUpperCase()))
                setBase(newFilteredArray)
            }
        })
    } , [searchInput , filter , refresh])

    return (
        <section className={cls.root}>
            {
                template ? (
                    <>
                        <div className={cls.backBtn}>
                            <span onClick={() => setTemplate(!template)}>назад</span>
                        </div>
                        <div className={cls.admin_body_add_inside}>
                            <div>
                                <input onChange={e => setNewImg(e.target.value)} value={newImg} type="text" placeholder='Изображение'/>
                                <input onChange={e => setNewName(e.target.value)} value={newName} type="text" placeholder="Название"/>
                                <input onChange={e => setNewPrize(e.target.value)} value={newPrize} type="text" placeholder='Стоимость'/>
                            </div>
                            <div>
                                <span onClick={showSizeBlock}>
                                    Размер : {newSize}
                                    <div className={showSize ? cls.sizeActive : null}>
                                        <p onClick={() => setNewSize('S')}>S</p>
                                        <p onClick={() => setNewSize('M')}>M</p>
                                        <p onClick={() => setNewSize('L')}>L</p>
                                        <p onClick={() => setNewSize('XL')}>XL</p>
                                        <p onClick={() => setNewSize('XXL')}>XXL</p>
                                    </div>
                                </span>
                                <span onClick={chooseStateBtn} className={cls.stateClothe}>
                                    Состояние {newStateOfClothe}
                                    <h5 className={chooseState ? cls.activeState : null}>
                                        <p onClick={() => setNewStateOfClothe('Новая')}>Новая</p>
                                        <p onClick={() => setNewStateOfClothe('Хит')}>Хит</p>
                                        <p onClick={() => setNewStateOfClothe('Популярное')}>Популярное</p>
                                    </h5>
                                </span>
                                <textarea onChange={e => setNewContent(e.target.value)} value={newContent} placeholder='Описание' id="" cols="30" rows="12"></textarea>
                            </div>
                            <div className={cls.admin_body_add_inside_btn}>
                                <button onClick={sendSingleClothe}>Потдвердить</button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className={cls.search_header}>
                            <input value={searchInput} onChange={e => setSearchInput(e.target.value)} placeholder='Поиск' type="text" />
                            <span onClick={showFilterBtn}>
                                Искать по {filter}
                                <div className={showFilter ? cls.activeFilter : null}>
                                    {
                                        filterArray.map((item , index) => {
                                            return <p onClick={() => setFilter(item)} key={index}>{item}</p>
                                        })
                                    }
                                    <p onClick={() => setFilter('всему')}>всему</p>
                                </div>
                            </span>
                        </div>
                        <div className={cls.search_body}>
                            {
                                base.length === 0 ? (
                                    <h2 className={cls.error}>Ничего не найдено</h2>
                                ) : (
                                    base.map(({img , name , id }) => {
                                        return  <div key={id} className={cls.admin_body_content_inner}>
                                        <img src={img}/>
                                        <div>
                                            <h4>{name}</h4>
                                            <ul>
                                                <li onClick={() => setChangeTemplate(id)}><AiOutlineEdit/></li>
                                                <li onClick={() => deleteClotheses(id)}><AiFillDelete/></li>
                                            </ul>
                                        </div>
                                    </div>
                                    })
                                )
                            }
                        </div>
                    </>
                )
            }
        </section>
    )
}

export default Clothes