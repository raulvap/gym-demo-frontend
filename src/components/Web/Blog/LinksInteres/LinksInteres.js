import React from "react";

// import LinkIcon from "../../../../assets/img/svg/link.svg";
// import BibleIcon from "../../../../assets/img/svg/bible.svg";
import "./LinksInteres.scss";

export default function LinksInteres() {
   return (
      <div className="links-interes">
         <Liga
            nombre="Vatican.va"
            url="http://www.vatican.va/content/vatican/es.html"
            logo="http://www.vatican.va/etc/designs/vatican/favicon.ico"
         />
         <Liga
            nombre="Vatican News"
            url="https://www.vaticannews.va/es.html"
            logo="https://www.vaticannews.va/etc/designs/vatican-news/release/library/main/images/favicons/favicon-32x32.png"
         />
         <Liga
            nombre="Arquidiocesis de Guadalajara"
            url="https://arquidiocesisgdl.org/"
            logo="https://pbs.twimg.com/profile_images/2511263767/dji0gwhp1lfsyr9yjg2u_400x400.jpeg"
         />
         <Liga
            nombre="Biblia Digital"
            url="http://www.clerus.org/bibliaclerusonline/es/index.htm"
            logo="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAA8FBMVEX///91eIkrN0+eoKz/uFpdX23LkkclMksAFzp4e4woNU1FTWKio69mbHweLUeSlKFwc4PySW1XWmkJK07eolj/vFoYL0+rglXIkEY/SF31sFYiM0+qf0kAJk5tW1EbKkZcY3MyPVQdN056PFhFRFBaUFGOcFPFk1b/wltcY3IOIUDx8vM6RFr7Sm+uQWCBhpKScErCxMp5Y1JOVWnlp1jX2dxjO1Xk5ugAFTnVnFWfeEm9ikjO0NWnfUmdelTUl0aAZUtwXVK/jlZjVVEAHE4AFk2Ii5o5Pk7MRWbdR2lLOVMINk28Q2OVP108OFGsr7fAYimvAAAINElEQVR4nO3dcUObOBgH4EK1lLQgZ4VJcZZ2unnYDmftnNOt3e2u3k43v/+3OdraJimkoICEd/n95+oojyGBQEgqladk9OA3unKR6Tb8h9GT9vkJufSR11FQoUBZRkrHk/3LPHxaXS9atwzS60bmxqqnF+2ionvNbIGuVzQpFM/N0Hdq81WAi+iN08yEfaVoTWR0OyvgLo8lOIvuZgOs8lcHl/EesgBefirasSH1LKqiS1VCpOhBFPIfMgxxwkWttViLONRJWTfSA0d1aou24U+nO1iNbC3D2KvdR8cXe1SuDub5PDmyqEJMfwlnEM0Mkv3mPBoWNlQps6hDXEAtc4uM2a4tMh6fkcWo+2mBp0Qzo9jVZnWWvIQS3q7cuqKEW+392tK4f4uJSE8r/ICFqFt9TG5CCQuttyZDWKtdO/jP7t2kFE7xQapPm3kLVdw1Q7ds4fgM18VONaWQaFMazdzLkKqIe0xhbdxd/Z6ipRTiBlyR8heSFdGZmGzh+eo4RWkv3XA1xAdpjkIJVzC51WYKa8RhmrapwWdDfaeav5A8TK1XJlP4BQu9cgnJwxQhdhkeYGG9ZEKiNZWtryZE4S5xzWu1AQolibgkc85NgEKyrZFfX5nwhJJBds1QG6CQKkTn0IQnpGqi3Fq2p5CEVHMqt96Z4ITUOTFobfZMcELywib4BuvCBCdUhzRxVoqwhJLaRxQxqIvAhJJB3TNErVcn0IQqVRWDFvW8XYMlXKuKwUW4/GUMSxgiIuv7/hiUUFIba8/0HPS2NoYkDBNlx5lcjwEJI4iyYx0ejMdghKG6uDDeTg7ACCXVDRNl5FjOET5fllsYnBdR5CAe4h9LLpRUoxszTKLswnll3DgWq/zCoBg3jnYBIJw3OOxiBCGUVGkY3eKAEc4OVZth5EyoriX5/zS2txvdKCRHQtXQ3FA0IyEzEG5v79pyCMmNUNX60aOEum6iLcyFc2RQkohD4YazmtJ/inCWYaPPnTCim4CDugm2QQqDkuTtujTyCpooxWH8RjgXSvLmKEbJhTFFGGwlvhA5Fzbi3mPol11oxwkReKECSIiIgBSi2yMcvJuAhNarE/MxJxctmEI8RGZPCIWwcCHu6CYQxnWKORSqmru7DB5cwRCi5W8OXS0ayZ1Q1bqKEnHiYwjxaVJR5MguMW/CqGcqG4VkIrvEnAnZHd4kQhlFEPkSbugtJRJGdYk5E7Lf2U8mjOgS8yXU2B3epMLd9c1yJaRGiD5PiGzoQjl0+00ICxMih06LFL5e+5D4w5RGiI6+HVL5/hcWXnynP/t2jPe7NELr7arDu8wWztonJ+/wGJISCen3JDfGFEIhFEIhFEIhFMKyCqFf08jWazp/E28v7/2z9iExL0t5hOuB13sSwpIKNwy9SHqfJrRZroTU69jPEyqhO/t8CenXB58jROG/GlfCDTdME97zDj+c4UzIromJhErERjkTBkTGmOUEQhQ5kI834XzsOR4lGy8khtQ2jDI8P5wZVWM1lx4e8Mp6yr36XUOK3iCHQhILdaSCEAqhEAqhEAqhEAqhEAqhEAqhEAqhEAqhEAqhEAqhEAqhEAoh30Lobzqjo2McvJuAhOQLGMRTYkjC6Agh98INw8AWiZ9HiXMh+Bl44mdR0mK3wLkwphCTbIRzYdxsZgm2wLtwE1Hpx8/0xf+MdI+TLEQlegoFppDbWQVnRiM8MaTraowxUJFCrmeGXCDDSfpfyzC7Z6qohi1HXzbAEKoSe+pMEELmaFUgQvCzXUOfsTymAMsvBL9yAGv1BwvK6g+MFTzOwazgwViFpQZmFZbIlXT2Aa2kE14NyZrsQ1oNKWJFq2tQK1qtAx0H2KpkoZXlDi+ArSxHv6OJWl9NYKsDql1EAcGt8Ah/lU6NBsJbaZWedrEFb7Xc32DFY7KVgbhqNfyVx6nV42WAq8dTa2G0rkx4QrIWOud48A0YITVvprU6RiEJcQlS46fgCInLGYS2tuAJyXaGKsL8hB0snDZfoAzJhrTNLsPPWNhJKcTdGMV4ASFxkDoTkykcnzurHeimFBIWO38h2ZK29rbYQuIPr6UU7uj4MPWbuQvxMYqOTKZwfEYcpDsphR88/J3d3MuQuGKzvrKF16tjVJa9m5RCoqkJjtNqM1ch+ZiidbXFEI6vyXscaRuaSkXSCaLsN+fJS0hWQ7oIzfbSNz4jH0fpfmrhCJ8RZxvsG/50OnWJ9kfLMHiOMHS8d0XnYJ7Pk1uL3KH6KLWwQt+5RIoehOzgRI8Del6IwkGttViLONTzRD1tSzrLJVWInKV+mYGwUvXiv6mgeM0sgJWKq8d/VyHR/8wGWKnEDRYoKLqdFbBy2uexFPXGaWbC4EDlry56WTSjRKp1vopR9x6yBQYnDaOux71T8FJBet3I8ghdGX3F6ygbxtC9CA7pHQ/5mZwGozKqGnbwFR3ymqa3FvK6JPjVbKMj22hmcKEWm+qqx9F7M/iDyuB9b/mZ4r7AruQUIXwUZnbJ8fIRQiHkP79lSzMYwBYO/n3//h6wcPDjv7te706+HwAVDu57C9XdzwFI4eDn3fKnu48ghR9XwODHXz/ugQnRx189mQjqvQEmDL8yh8FAhBsihDxHCIWQ/0QIlfD9VFjCjuuHbouDEnp+pfLgIbBC9Gl+i32kK0CFivJ4j/Z02AEp7AzxMwSqMpZZ+EAIPWq8x0MdV8YMRoIUltNPqyq4/pRrhB9qeB+K2btMsjwaFT30mGRVGfVGEXuWWYx6UFSKN4x6jOcvPsv0IXQBuZH6sst4DntjdLta5s9on5n/AWAnNiZGTG6BAAAAAElFTkSuQmCC"
         />
         <Liga
            nombre="Catecismo"
            url="http://www.vatican.va/archive/catechism_sp/index_sp.html"
            logo="http://www.vatican.va/etc/designs/vatican/favicon.ico"
         />
         <Liga
            nombre="Santoral"
            url="https://es.catholic.net/op/santoral/"
            logo="https://media.istockphoto.com/vectors/link-icon-silhouette-vector-id1191765697?k=6&m=1191765697&s=170667a&w=0&h=Wnxndfu3TYmHcUFNaIZ4RluvlRSMms8yCaDUU1RFqAE="
         />
      </div>
   );
}

function Liga(props) {
   const { nombre, url, logo } = props;

   //   if (!logo) {
   //     logo = { LinkIcon };
   //   }

   return (
      <div className="links-interes__liga">
         <a href={url} target="_blank" rel="noopener noreferrer">
            <img src={logo} alt={nombre} />

            {nombre}
         </a>
      </div>
   );
}
