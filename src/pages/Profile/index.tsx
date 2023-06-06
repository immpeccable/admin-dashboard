import React from "react";

const ProfilePage = () => {
  const account = "0xb45D97530b6b5426a3b25BE5710b8A276ADAe7a2";

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col p-3 rounded-lg border-2 bg-slate-50">
        <h1 className="text-2xl font-bold">Profile</h1>

        <table className="text-left">
          <tr>
            <td>
              <h1 className="text-md font-medium mt-3">Yusuf Mirza Altay</h1>
            </td>
            <td>
              <h1 className="text-md font-medium mt-3">{account}</h1>
            </td>
          </tr>
          <tr>
            <td>
              <h1 className="text-md font-medium mt-3">Address</h1>
            </td>
            <td>
              <h1 className="text-md font-medium mt-3">
                Üniversiteler, Dumlupınar Blv. 1/6 D:133, 06800 Çankaya/Ankara
              </h1>
            </td>
          </tr>
          <tr>
            <td>
              <h1 className="text-md font-medium mt-3">Telephone Number</h1>
            </td>
            <td>
              <h1 className="text-md font-medium mt-3">+90 543 123 45 65</h1>
            </td>
          </tr>
          <tr>
            <td>
              <h1 className="text-md font-medium mt-3">Political Part</h1>
            </td>
            <td>
              <h1 className="text-md font-medium mt-3">CHP</h1>
            </td>
          </tr>
          <tr>
            <td>
              <h1 className="text-md font-medium mt-3">Role</h1>
            </td>
            <td>
              <h1 className="text-md font-medium mt-3">
                District Ballot Box Responsible
              </h1>
            </td>
          </tr>

          <tr>
            <td>
              <h1 className="text-md font-medium mt-3">
                City / District / Ballot Box
              </h1>
            </td>
            <td>
              <h1 className="text-md font-medium mt-3">
                Ankara / Çankata / 1061112
              </h1>
            </td>
          </tr>
        </table>
      </div>

      <div className="flex flex-col md:flex-row">
        <div className="basis-1/2 flex flex-col p-3 rounded-lg border-2 bg-slate-50 mr-3">
          <h1 className="text-2xl font-bold">Transactions</h1>

          <table className="border-separate border-spacing-2 text-left mt-4">
            <tr>
              <th>Transaction Type</th>
              <th>Hash</th>
            </tr>
            <tr>
              <td>Grant access for specter</td>
              <td>0xb45D97530b6...</td>
            </tr>
            <tr>
              <td>Grant access for specter</td>
              <td>0xb45D97530b6...</td>
            </tr>
            <tr>
              <td>Grant access for specter</td>
              <td>0xb45D97530b6...</td>
            </tr>
          </table>
        </div>
        <div className="basis-1/2 flex flex-col p-3 rounded-lg border-2 bg-slate-50 ml-3">
          <h1 className="text-2xl font-bold">Granted users</h1>
          <table className="border-separate border-spacing-2 text-left mt-4">
            <tr>
              <th>User</th>
              <th>Action</th>
            </tr>
            <tr>
              <td>0xb45D97530b6...</td>
              <td>Access for ballot box</td>
            </tr>
            <tr>
              <td>0xb45D97530b6...</td>
              <td>Access for ballot box</td>
            </tr>
            <tr>
              <td>0xb45D97530b6...</td>
              <td>Access for ballot box</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
