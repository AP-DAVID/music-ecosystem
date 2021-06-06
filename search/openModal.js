const Openmodal = () => {
    return ( 
    <div class="ui basic modal">
        <div class="ui icon header">
            <i class="archive icon"></i>
            Logout
        </div>
        <div class="content">
            <p>Would you like to logout?</p>
        </div>
        <div class="actions">
            <div class="ui red basic cancel inverted button">
            <i class="remove icon"></i>
            No
            </div>
            <div class="ui green ok inverted button">
            <i class="checkmark icon"></i>
            Yes
            </div>
        </div>
     </div>
     )
}
 
export default Openmodal;