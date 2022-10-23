import { Link } from 'react-router-dom'

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">Leave Management By Flurn</span></h1>
            </header>
            <main className="public__main">
                <p>Located in Beautiful Downtown Foo City, Flurn brings amazing after-school group classes, run by highly qualified & trusted teachers right to your doorstep</p>
                <address className="public__addr">
                    Flurn<br />
                    555 Foo Drive<br />
                    Foo City, CA 12345<br />
                    <a href="tel:+15555555555">(555) 555-5555</a>
                </address>
                <br />
                <p>Owner: Flurn</p>
            </main>
            <footer>
                <Link to="/login"> Login</Link>
                <Link to="/regiter">Regiter</Link>
            </footer>
        </section>

    )
    return content
}
export default Public