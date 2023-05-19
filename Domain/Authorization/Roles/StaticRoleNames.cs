namespace Domain.Authorization.Roles
{
    public static class StaticRoleNames
    {
        public sealed class Host
        {
            private static Host _instance;
            private static readonly object _mutex = new object();
            private const string _adminDefault = "Admin Progresa Full";
            private const string _userDPL = "User DPL Progresa";
            private const string _company = "Company Progresa";

            public Host()
            {
                Admin = _adminDefault;
                UserDPL = _userDPL;
                Company = _company;
            }

            public static Host Instance
            {
                get
                {
                    if (_instance == null)
                    {
                        lock (_mutex)
                        {
                            if (_instance == null)
                            {
                                _instance = new Host();
                            }
                        }
                    }
                    return _instance;
                }
            }

            public readonly string Admin;
            public readonly string UserDPL;
            public readonly string Company;
        }
    }
}