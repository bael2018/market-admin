import { useState , useEffect } from 'react'
import cls from './Site.module.css'
import {createNewClothes, getClothes } from '../../api'
import { singleArray } from '../../Components/ArrayFunc'

const Site = () => {
    const [size , setSize] = useState('S')
    const [cat , setCat] = useState([])
    const [showSize , setShowSize] = useState(false)
    const showSizeBlock = () => setShowSize(!showSize)
    const [img , setImg] = useState('')
    const [name , setName] = useState('')
    const [price , setPrice] = useState('')
    const [content , setContent] = useState('')
    const [chooseCat , setChooseCat] = useState(false)
    const unchoose = () => setChooseCat(!chooseCat)
    const [categoryTitle , setCategoryTitle] = useState('')
    const [sendCategory , setSendCategory] = useState('')
    const [sendSubCategery , setSubCategery] = useState('')
    const [stateOfClothe , setStateOfClothe] = useState('Новая')
    const [chooseState , setChooseState] = useState(false)
    const chooseStateBtn = () => setChooseState(!chooseState)
    const [subCategoryOne , setSubCategoryOne] = useState('')

    const addCategories = e => {
        e.preventDefault();
        if(sendCategory !== ''){
                createNewClothes({
                    name: sendCategory,
                },'categories.json',''
            )
            .then(() => setSendCategory(''))
        }else{
            alert("Заполните поля ввода")
        }
    }

    const addSubCategory = e => {
        e.preventDefault();
        if(subCategoryOne !== ''){
                createNewClothes({
                    name: subCategoryOne,
                },'subCategory.json',''
            )
            .then(() => setSubCategoryOne(''))
        }else{
            alert("Заполните поля ввода")
        }
    }

    useEffect(() => {
        getClothes('categories.json' , '' , '')
        .then(res => res.json())
        .then(r => {
            const categoryArray = singleArray(r)
            setCat(categoryArray)
        })
    }, [])
    
    const sendSingleClothe = e => {
        e.preventDefault()
        if(categoryTitle !== '' && sendSubCategery !== '' && img !== '' && name !== '' && price !== '' && content !== ''){
            getClothes('subCategory.json' , '' , '')
            .then(res => res.json())
            .then(r => {
                const arr = Object.values(r).find(item => item.title === sendSubCategery)
                createNewClothes({
                        name,
                        img,
                        price,
                        content,
                        size: size,
                        category: categoryTitle,
                        subCategory: sendSubCategery,
                        isLiked: false,
                        isChoosed: false,
                        state: stateOfClothe
                    }, `products.json` , ``
                ).then(() => {
                    setPrice('')
                    setName('')
                    setContent('')
                    setImg('')
                    setSubCategery('')
                    setCategoryTitle('')
                    setSize('S')
                    setStateOfClothe('Новая')
                })
            })
        }else{
            alert('Заполните все поля ввода и выберите категорию для отправки!')
        }
    }

    return (
        <div className={cls.admin_body_right}>
            <div className={cls.admin_body_add}>
                <h3>Добавление</h3>
                <form action="address">
                    <div>
                       <input onChange={e => setSendCategory(e.target.value)} value={sendCategory} placeholder="Категория" type="text" />
                    </div>
                    <div>
                        <button onClick={addCategories}>Потдвердить</button>
                    </div>

                    <div>
                       <input onChange={e => setSubCategoryOne(e.target.value)} value={subCategoryOne} placeholder="Подкатегория" type="text" />
                    </div>
                    <div>
                        <button onClick={addSubCategory}>Потдвердить</button>
                    </div>
                </form>
            </div>
            <div className={cls.admin_body_content}>
                <div>
                    <h3>Отправка</h3>
                    <div className={cls.chooseCategory}>
                        <h4>Выберите Категорию для отправки !</h4>
                        <span onClick={unchoose}>
                            Категория {categoryTitle}
                            <h5 className={chooseCat ? cls.activeCategory : null}>
                                {
                                    cat.map((item , index) => {
                                        return <p onClick={() => setCategoryTitle(item)} key={index}>{item}</p>
                                    })
                                }
                            </h5>
                        </span>
                    </div>
                    <div className={cls.admin_body_add_inside}>
                        <div>
                            <input onChange={e => setImg(e.target.value)} value={img} type="text" placeholder='Изображение'/>
                            <input onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Название"/>
                            <input onChange={e => setPrice(e.target.value)} value={price} type="text" placeholder='Стоимость'/>
                        </div>
                        <div>
                            <input onChange={e => setSubCategery(e.target.value)} value={sendSubCategery} type="text" placeholder='Подкатегория'/>
                            <span onClick={showSizeBlock}>
                                Размер : {size}
                                <div className={showSize ? cls.sizeActive : null}>
                                    <p onClick={() => setSize('S')}>S</p>
                                    <p onClick={() => setSize('M')}>M</p>
                                    <p onClick={() => setSize('L')}>L</p>
                                    <p onClick={() => setSize('XL')}>XL</p>
                                    <p onClick={() => setSize('XXL')}>XXL</p>
                                </div>
                            </span>
                            <span onClick={chooseStateBtn} className={cls.stateClothe}>
                                Состояние {stateOfClothe}
                                <h5 className={chooseState ? cls.activeState : null}>
                                    <p onClick={() => setStateOfClothe('Новая')}>Новая</p>
                                    <p onClick={() => setStateOfClothe('Хит')}>Хит</p>
                                    <p onClick={() => setStateOfClothe('Популярное')}>Популярное</p>
                                </h5>
                            </span>
                            <textarea onChange={e => setContent(e.target.value)} value={content} placeholder='Описание' id="" cols="30" rows="12"></textarea>
                        </div>
                        <div className={cls.admin_body_add_inside_btn}>
                            <button onClick={sendSingleClothe}>Потдвердить</button>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    )
}

export default Site