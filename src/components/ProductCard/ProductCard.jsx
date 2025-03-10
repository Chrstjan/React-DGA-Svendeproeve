import { NavLink } from "react-router-dom"
import s from "./ProductCard.module.scss"

export const ProductCard = ({data, topHeader}) => {
  return (
    <>
        {data?.map((item) => {
            return (
                <figure className={s.cardStyling} key={item?.id}>
                    {topHeader ? <figcaption className={s.topStyling}>
                        <NavLink>
                            <p>{item?.name}</p>
                        </NavLink>
                    </figcaption> : null}
                    <img src={item?.image || item?.category_image} />
                    {!topHeader ? <figcaption className={s.captionStyling}>
                    <p>{item?.name}</p>
                </figcaption> : null}
                </figure>
            )
        })}
    </>
  )
}