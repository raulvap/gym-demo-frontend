import React from "react";
import { Helmet } from "react-helmet";
import { Row, Col } from "antd";
import { dataParroquia, dataDireccion } from "../utils/dataVariables";

import "../scss/index.scss";

export default function AvisoPrivacidad() {
   const sujeto = "ECLESIA DIGITAL";
   const direccion = dataDireccion;
   const parroquia = dataParroquia;
   const correo = "info@eclesia.com.mx";
   const fecha = "8 de marzo de 2021";

   return (
      <>
         <Helmet>
            <title>Aviso de Privacidad | {dataParroquia}</title>
            <meta
               name="Aviso de privacidad"
               content="Aviso de Privacidad"
               data-react-helmet="true"
            />
         </Helmet>
         <Row>
            <Col span={3} />
            <Col span={18}>
               <h1>AVISO DE PRIVACIDAD</h1>
               <p style={{ textAlign: "justify" }}>
                  En cumplimiento a lo previsto en la Ley Federal de Protección de Datos Personales
                  en Posesión de los Particulares (en lo sucesivo "la Ley"), nos permitimos
                  informarle lo siguiente: {sujeto} y {parroquia}, (en lo sucesivo el "Grupo"),
                  señalando para efectos del presente Aviso de Privacidad el domicilio ubicado en:{" "}
                  {direccion}, será el responsable de recabar sus datos personales. También será
                  responsable del uso y protección que se le dé a los mismos.
                  <br />
                  El tratamiento de sus datos personales será efectuado de conformidad con los
                  presentes términos y condiciones, por lo que, desde este momento se entiende que
                  otorga su consentimiento para dicho tratamiento. El Grupo podrá recolectar la
                  totalidad o algunos de los siguientes datos personales: (i) Datos de
                  identificación: nombre completo, lugar y fecha de nacimiento, nacionalidad, edad,
                  estado civil, género e imagen (ii) Datos de contacto: domicilio, correo
                  electrónico, teléfono fijo y teléfono celular (en adelante, “los Datos
                  Personales”). Sus Datos Personales también pueden ser recabados por el Grupo, a
                  través de: Dispositivos automáticos tales como cámaras de video instaladas en
                  cualquier instalación del Grupo. La totalidad de las redes sociales (Facebook,
                  Instragram, entre otros), Servicios de Mensajes Cortos (SMS) y sistemas de
                  mensajería instantánea por internet (WhatsApp, entre otros). En Grupo {sujeto} no
                  recabamos Datos Personales confidenciales categorizados como “sensibles”, tales
                  como: Origen racial o étnico Opiniones políticas Convicciones religiosas,
                  filosóficas y morales Salud (características genéticas y datos biométricos), etc.
                  El Grupo no recabará Datos Personales adicionales a los establecidos en el
                  presente Aviso de Privacidad. Los Datos Personales que recabe el Grupo serán
                  utilizados para cualesquiera de las siguientes finalidades principales: (i)
                  identificarle; (ii) ubicarle; (iii) comunicarle; (iv) contactarle; (v) enviarle
                  información y/o mercancía; (vi) fines estadísticos; (vii) revisar y atender sus
                  comentarios; (viii) enviarle el Newsletter de {parroquia}; (ix) publicar las
                  anécdotas que desee compartir; (x) comunicarle avisos; (xi) invitarle a participar
                  en las redes sociales de la {parroquia}; (xii) permitir la descarga de documentos;
                  (xiii) fines informativos; (xiv) asegurar el cumplimiento de todo tipo de
                  obligaciones legales y (xv) envío de notificaciones con respecto a cambios en este
                  Aviso de Privacidad.
                  <br />
                  Es su responsabilidad el garantizar que los Datos facilitados al Grupo sean
                  veraces y completos, así como comunicar al Grupo cualquier modificación en los
                  mismos a efecto de que se pueda cumplir con la obligación de mantener la
                  información actualizada. El Grupo no recabará Datos Personales directamente de
                  niños menores de 18 años. Solo podrán dar consentimiento de los Datos recabados
                  las personas mayores de 18 años. Se recomienda que los padres/tutores revisen y
                  monitoreen regularmente el uso del correo electrónico y otras actividades on-line
                  de sus hijos para que no nos compartan información personal identificable sin su
                  consentimiento previo. En cualquier momento, usted nos puede solicitar que
                  eliminemos cualquier Dato Personal de sus hijos enviándonos una solicitud de
                  borrar por correo electrónico a la siguiente dirección de e-mail: {correo}.
                  <br />
                  De igual forma, durante su visita a esta página, el Grupo automáticamente puede
                  recabar la siguiente información respecto de su computadora y su visita: (i) el
                  dominio y servidor del cual ingresan a Internet, (ii) la dirección de Internet de
                  la página de la que se enlazó directamente a nuestra página, en su caso, (iii) la
                  fecha y hora en la que ingresó a nuestra página y cuánto tiempo permaneció en la
                  página y qué áreas visitó, (iv) su dirección del Protocolo de Internet (Internet
                  Protocol - IP) y (v) el sistema operativo de su computadora y el software del
                  navegador. Podemos emplear a terceros para manejar estas medidas de ejecución, sin
                  embargo, en ningún caso obtenemos información sobre la identidad individual de
                  cualquier visitante. Dichos terceros deberán observar nuestros estándares de
                  privacidad y proporcionarnos únicamente la información en su totalidad, para
                  utilizar la información recabada sólo para los propósitos para los que el tercero
                  fue contratado, y después destruir la información.{" "}
               </p>
               <h3>Cookies</h3>
               <p style={{ textAlign: "justify" }}>
                  Esta página de Internet puede utilizar cookies que envían información a su
                  computadora mientras que navega en nuestra página. Los cookies son únicos a su
                  computadora y permiten al servidor de Internet recabar información que harán que
                  su uso de la página sea más fácil y conveniente. Los cookies añaden conveniencia
                  que le permiten ahorrar tiempo cuando regresa a esta página. Únicamente pueden ser
                  registrados por su servidor de Internet en el dominio que le emitió el cookie. Los
                  cookies no pueden ser utilizados para operar programas o ingresar virus a su
                  computadora. Usamos cookies propias y de terceros para obtener información no
                  personal de visitantes en línea. Los cookies rastrean el tipo de navegador,
                  sistema operativo y prestador de servicios de Internet y nos permiten tabular el
                  número total de visitantes en nuestra página. Usted puede desactivar el cookie en
                  su computadora o programarla para avisarle cuando se le envían cookies mediante el
                  icono de preferencias de su navegador. La temporalidad del manejo de sus Datos
                  Personales en todos los casos será sólo por el tiempo razonable y para cumplir con
                  las obligaciones que se deriven con motivo del vínculo que tiene con el Grupo. La
                  información que sea entregada al Grupo será debidamente resguardada, conservada y
                  protegida con los medios tecnológicos y físicos adecuados a efecto de que se
                  impida su daño, pérdida, alteración, destrucción o el uso, acceso o tratamiento no
                  autorizado. Sólo tendrán acceso a la información aquellas personas estrictamente
                  autorizadas por el Grupo. En caso de que los Datos Personales resguardados sean
                  requeridos por una autoridad de cualquier índole ya sea por proceso legal, para
                  responder a cualquier reclamo o acciones legales, o para proteger los derechos del
                  Grupo o sus asociados y el público, estos datos se podrán a su disposición dentro
                  del estricto cumplimiento a la Ley. Es importante informarle que usted, como
                  Titular de la información tiene derecho a acceder a sus Datos Personales que
                  poseemos y a los detalles del tratamiento de estos, así como a rectificarlos en
                  caso de ser inexactos o incompletos; cancelarlos cuando considere que no se
                  requieren para alguna de las finalidades señaladas en el presente Aviso de
                  Privacidad o estén siendo utilizados para finalidades no consentidas; y oponerse
                  al tratamiento de los mismos para fines específicos o limitar su uso o
                  divulgación., Para ejercitar esos derechos, es necesario que presente una
                  solicitud escrita dirigida al Departamento de Datos de {sujeto}, al siguiente
                  domicilio:
                  {direccion}, en el horario de 10:00 a 17:00 horas, en días hábiles.
                  <br />
                  El Grupo dará respuesta a las solicitudes del Titular que sean ejercidas por éste
                  previa acreditación de su identidad con identificación oficial (credencial para
                  votar con fotografía, pasaporte, cartilla militar, o licencia de conducir), en
                  copia simple y habiendo exhibido el original para su cotejo, o en caso de actuar
                  por representación de un tercero, se deberá de presentar la Escritura Pública o
                  carta poder firmada ante dos testigos. Toda solicitud para que sea tramitada
                  deberá contener y acompañar lo siguiente: El nombre del titular y domicilio u otro
                  medio para comunicarle la respuesta a su solicitud. Los documentos que acrediten
                  la identidad o, en su caso, la representación legal del titular. La descripción
                  clara y precisa de los Datos Personales respecto de los que se busca ejercer
                  alguno de los derechos. Cualquier otro elemento o documento que facilite la
                  localización de los datos personales. En caso de que el Titular no señale
                  domicilio para recibir la respuesta, se tendrá por no presentada la solicitud,
                  para lo cual se emitirá la constancia pertinente. El Grupo tendrá un plazo de
                  treinta días hábiles, contados desde la fecha en que se recibió la solicitud, o a
                  partir de que el titular solvento el requerimiento de información, para
                  comunicarle al Titular si se acepta o no la misma. En caso de que la solicitud sea
                  aceptada, se hará efectiva dentro de los quince días siguientes. Los plazos
                  referidos podrán ser ampliados una sola vez por un periodo igual cuando esté
                  justificado. La respuesta a las solicitudes se dará a elección del Titular por
                  medio de correo electrónico, o mediante respuesta escrita cuando acuda
                  directamente a las oficinas del Grupo en la dirección señalada a recogerla,
                  pudiéndose reproducir la respuesta en documentos electrónicos, copias simples, o
                  de manera verbal. Los Titulares de la información tendrán derecho a revocar el
                  consentimiento para el tratamiento de sus Datos en cualquier momento, para lo cual
                  deberán de presentar su solicitud y reunir los requisitos señalados, a efecto de
                  que el Grupo efectúe el procedimiento descrito.
                  <br />
                  Si usted desea dejar de recibir mensajes promocionales o comunicados de nuestra
                  parte puede solicitarlo a través del correo {correo}
                  <br />
                  En el supuesto de que el Grupo requiera usar sus Datos Personales con fines
                  distintos a los pactados o convenidos al tenor de la relación jurídica que se
                  tiene con el Titular, se notificará en forma escrita, telefónica, electrónica, o
                  por cualquier medio óptico, sonoro, visual u otro que la tecnología permita ahora
                  o en lo futuro y explicando los nuevos usos que pretenda darle a dicha información
                  a fin de recabar su autorización.
                  <br />
                  El Grupo se reserva el derecho de modificar en cualquier momento el presente Aviso
                  de Privacidad para cumplir con actualizaciones legislativas, jurisprudenciales,
                  políticas internas, nuevos requisitos para la prestación de servicios o cualquier
                  otra causa. Cualquier modificación, así como el presente documento actualizado
                  estará disponible en las plataformas o instalaciones en que sea utilizado. El
                  presente Aviso de Privacidad, así como el manejo en general de la Ley que haga el
                  Grupo, se rige por la legislación vigente y aplicable en los Estados Unidos
                  Mexicanos, por lo que cualquier controversia que se suscite con motivo de su
                  aplicación deberá ventilarse ante los Órganos Jurisdiccionales competentes en la
                  Ciudad de Guadalajara, Jalisco MX. Actualizado al {fecha}
               </p>
               <br />
               <h1>AVISO DE CONFIDENCIALIDAD</h1>
               <p style={{ textAlign: "justify" }}>
                  La información contenida en los correos electrónicos pertenecientes a {sujeto} y/o
                  cualquier archivo contenido en ellos, es confidencial y/o legalmente privilegiada
                  y para el uso único y exclusivo del destinatario, por lo que se prohíbe el uso,
                  reproducción, retransmisión o divulgación no autorizada, parcial o total, de su
                  contenido. Si usted ha recibido un mensaje por error, por favor notifíquelo al
                  remitente, bórrelo de inmediato y en forma permanente, junto con cualquier copia
                  digital o impresa, así como cualquier archivo anexo al mismo.
                  <br />
               </p>
               <hr style={{ marginTop: "80px" }} />
               <p style={{ marginBottom: "60px", textAlign: "center", fontWeight: "bold" }}>
                  Una obra encomendada al Sagrado Corazón de Jesús y a la Inmaculada Concepción de
                  María
               </p>
            </Col>
            <Col span={3} />
         </Row>
      </>
   );
}
