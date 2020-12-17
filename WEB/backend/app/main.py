import traceback

###################
# DATA
import network
import verifypayload

###################
# FastAPI & Pydantic
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Request
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse, FileResponse

#########################################################


APItitle = "ZTP Cisco API"
APIdescription = (
    "Zero Touch Provisioning system for Cisco. API docs can be found at /docs"
)
APIAuthors = (
    "Kevin Kuusela (kevin.kuusela@sdnit.se) & Adrian Lyxell (adrina.lyxell@sdnit.se)."
)
APIversion = "1.0"

app = FastAPI(
    title=APItitle, description=APIdescription, version=APIversion, redoc_url=None
)
app.mount("/_nuxt", StaticFiles(directory="dist/_nuxt"), name="_nuxt")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


"""
#############################################
############# GENERATE FRONTEND #############
#############################################
"""


@app.get("/")
@app.get("/{path}")
async def index(request: Request, include_in_schema=False):
    print(f"{request.url.path}")
    return FileResponse("./dist/index.html")


"""
#############################################
############## API ENDPOINTS ################
#############################################
"""


@app.get("/api/version")
async def information_about_api(request: Request):
    """
    Get information about the API
    """
    print(f"[INFO] {request.client.host} {request.url.path}")
    try:
        print(f"[INFO] {request.client.host} {request.url.path}")
        return JSONResponse(
            status_code=200,
            content={
                "status": "success",
                "name": APItitle,
                "description": APIdescription,
                "authors": APIAuthors,
                "version": APIversion,
            },
        )
    except Exception as error:
        print(
            f"[WARNING] {request.client.host} {request.url.path}: {error}\n{traceback.format_exc()}"
        )


@app.get("/api/leases")
async def get_current_leases_in_ztp_dhcp(request: Request):
    """
    Get current leases found in ZTP DHCP handler
    """
    print(f"[INFO] {request.client.host} {request.url.path}")
    try:
        ztp_switches_available = network.get_leases()
        return JSONResponse(status_code=200, content=ztp_switches_available)
    except Exception as error:
        print(
            f"[WARNING] {request.client.host} {request.url.path}: {error}\n{traceback.format_exc()}"
        )


@app.get("/api/ping/{ip_address}")
async def ping_host(request: Request, ip_address: str):
    """
    Ping host to see if it's live.
    Returning {'switchIsUp': Bool}
    """
    print(f"[INFO] {request.client.host} {request.url.path}")
    try:
        response = network.ping_switch(ip_address)
        return JSONResponse(status_code=200, content={"switchIsUp": response})

    except Exception as error:
        print(
            f"[WARNING] {request.client.host} {request.url.path}: {error}\n{traceback.format_exc()}"
        )


@app.post("/api/provision")
async def provision_switch(
    request: Request, payload_class: verifypayload.provision_cisco
):
    """
    Provisioning switch.
    This will trigger Ansible to configure switch.
    """
    print(f"[INFO] {request.client.host} {request.url.path}")
    try:
        payload = payload_class.dict()

        ansible_result = network.start_ansible_playbook(
            payload["target_ip_address"],
            payload["hostname"],
            payload["ip_address"],
        )
        validate_ansible_result = network.validate_ansible_playbook(ansible_result)

        if validate_ansible_result is True:
            return JSONResponse(
                status_code=200,
                content={"output": ansible_result["ansible_output"], "success": True},
            )
        else:
            return JSONResponse(
                status_code=200,
                content={
                    "output": ansible_result["ansible_output"],
                    "success": False,
                    "message": "Ansible playbook failed. Please check logging for more information.",
                },
            )

        return JSONResponse(
            status_code=500,
            content={
                "message": "Something went wrong in the backend, see backend logs or contact admin."
            },
        )
    except Exception as error:
        print(
            f"[WARNING] {request.client.host} {request.url.path}: {error}\n{traceback.format_exc()}"
        )
        return JSONResponse(
            status_code=500,
            content={"message": f"Something when wrong in the backend. ERROR: {error}"},
        )
