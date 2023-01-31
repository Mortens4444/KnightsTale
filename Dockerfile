# See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.
# https://docs.docker.com/engine/reference/builder/#known-issues-run

FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
#EXPOSE 80
#EXPOSE 443
EXPOSE 44330

FROM mcr.microsoft.com/dotnet/framework/sdk:4.8-3.5

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS downloadnodejs
RUN mkdir -p C:\\nodejsfolder
WORKDIR C:\\nodejsfolder
SHELL ["pwsh", "-Command", "$ErrorActionPreference = 'Stop'; $ProgressPreference = 'silentlyContinue'; $NODE_VERSION = 'v16.19.0'; "]
RUN Invoke-WebRequest -OutFile nodejs.zip -UseBasicParsing "https://nodejs.org/dist/$NODE_VERSION/node-$NODE_VERSION-win-x64.zip"; Expand-Archive nodejs.zip -DestinationPath C:\\; Rename-Item "C:\\node-$NODE_VERSION-win-x64" C:\\nodejs

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
COPY --from=downloadnodejs C:\\nodejs C:\\src\\Chess.WebApi
#COPY --from=downloadnodejs C:\\nodejs C:\\Windows\\system32

WORKDIR /src
COPY . .
RUN dotnet restore KnightsTale.sln
WORKDIR "/src/Chess.WebApi"
RUN npm install -g npm@9.4.0
RUN npm install typescript -g
RUN npm install
WORKDIR "/src"
RUN dotnet build "KnightsTale.sln" -c Release -o /app/build

FROM build AS publish
#RUN dotnet publish "Chess.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false
RUN dotnet publish "Chess.WebApi/Chess.WebApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Chess.WebApi.dll"]