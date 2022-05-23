import HeaderBreadcrumbs from "./HeaderBreadcrumbs";
import { Container } from "@mui/material";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { put } from "../../utils/ApiCaller";
const handlePayIn = (req) => {
  LocalStorageUtils.getToken();
  const user = LocalStorageUtils.getUser();
  const amount = document.querySelector("#amount").value;
  put("/api/user/top-up", { username: user?.username, amount: amount }).then(
    (res) => {
      alert(res.data.message);
      user.balance += parseInt(amount);
      LocalStorageUtils.setUser(user);
      console.log("amount", amount);
      window.location.reload();
    }
  );
};
const TopUp = () => {
  return (
    <Container maxWidth="lg">
      <HeaderBreadcrumbs
        heading="Top Up"
        links={[{ name: "Account", href: "/my-account" }, { name: "Top Up" }]}
      />
      <div className="col-lg-12">
        <div className="row mt-4 mb-4 border-bottom">
          <form className="mt-4 topup-wrapper">
            <div className="form-group">
              <label for="amount">Top Up Here</label>
              <input type="number" className="form-control mt-2" id="amount" />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-4 ml-2"
              onClick={handlePayIn}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </Container>
  );
};
export default TopUp;
