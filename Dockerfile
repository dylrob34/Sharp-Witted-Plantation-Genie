#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM mcr.microsoft.com/dotnet/core/aspnet:3.0-buster-slim AS base
WORKDIR /app
EXPOSE 80

#should get node up and running
RUN curl -sL https://deb.nodesource.com/setup_10.x |  bash -
RUN apt-get install -y nodejs

FROM mcr.microsoft.com/dotnet/core/sdk:3.0-buster AS build
WORKDIR /src
COPY ["PlantationGenie.csproj", ""]
RUN dotnet restore "./PlantationGenie.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "PlantationGenie.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "PlantationGenie.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "PlantationGenie.dll"]