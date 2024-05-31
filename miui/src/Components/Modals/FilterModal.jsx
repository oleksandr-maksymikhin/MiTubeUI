import React from 'react';

import '../../Styles/Modals/FilterModal.scss';
import '../../index.scss'


function FilterModal({isShowFilter,closeFilter}) {
    
    return (
        <div className='filter-modal'>
            
            <div className="cross" onClick={closeFilter}></div>
            <button className='btn-lg'>Фільтри</button>
            <div className='row '>
                <div className='column'>
                    <button className='btn-lg btn-sm'>Тривалість</button>
                    <label>
                        <input type="radio" name="duration" />
                        <span className="word_opts">Не має значення</span>
                    </label>
                    <label>
                        <input type="radio" name="duration" />
                        <span className="word_opts">Менше 4 хвилини</span>
                    </label>
                    <label>
                        <input type="radio" name="duration" />
                        <span className="word_opts">Від 4 до 20 хвилин</span>
                    </label>
                    <label>
                        <input type="radio" name="duration" />
                        <span className="word_opts">Більше 20 хвилин</span>
                    </label>
                </div>
                <div className='column'>
                    <button className='btn-lg btn-sm'>Упорядкувати</button>
                    <label>
                        <input type="radio" name="arrange" />
                        <span className="word_opts">Релативність</span>
                    </label>
                    <label>
                        <input type="radio" name="arrange" />
                        <span className="word_opts">Дата завантаж.</span>
                    </label>
                    <label>
                        <input type="radio" name="arrange" />
                        <span className="word_opts">Число переглядів</span>
                    </label>
                    <label>
                        <input type="radio" name="arrange" />
                        <span className="word_opts">Рейтинг</span>
                    </label>
                </div>
            
            </div>
            <button className='btn-lg'>Застосувати</button>
        </div>
    );




}
export default FilterModal;