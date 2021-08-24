import axios from 'axios';

export default function Music(){
    return(
        <div>
            <h1>Hellow there</h1>
            <form action="/api/musicuploads/upload" method="POST" enctype="multipart/form-data">
                <div class="custom-file mb-3">
                    <input type="file" name="file" id="file" class="custom-file-input"/>
                    <label for="file" class="custom-file-label">Choose file</label>
                </div>

                <input type="submit" value="Submit" class="btn btn-primary btn-block" />
            </form>

        </div>
    )
}