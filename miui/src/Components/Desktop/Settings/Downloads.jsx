import "../../../Styles/Settings/Downloads.scss";

export default
    function Downloads() {


    return (

        <div className="downloadsMenu">
            <span className="inform">
                <span className="n2 ">Downloads</span>
            </span>
            <span className="inform ">

                <span className="n1 ">Manage download options</span>
            </span>
            <span className="inform" >

                <span className="n4 ">The selected download options apply only in this web browser</span>
            </span>
            <hr />
            <span className="inform">
                <span className="n2 first">Download quality</span>
                <span className="inform ">
                    <ul className="first">
                        <li>
                            <input type="radio" value="yes" name="option" id="yes" />
                            <label htmlFor="yes">Ask every time</label>
                        </li>
                        <li>
                            <input type="radio" value="no" name="option" id="no" />
                            <label htmlFor="no">Standard (480p)</label>
                        </li>
                        <li>
                            <input type="radio" value="maybe" name="option" id="maybe" />
                            <label htmlFor="maybe">Low (144p)</label>
                        </li>
                    </ul>

                </span>
            </span>
            <span className="inform ">
                <span className="n2 ">Delete all downloads</span>
            </span>
            <span className="inform ">
                <span className="n4">Deleting downloads will free up space on your device</span>
            </span>
            <span className="inform ">
                <button className="btn-lg">Delete all downloads</button>
            </span>
        </div>
    );
}