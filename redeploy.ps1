# Variables

$imageName = "fadilass05/mon-image:latest"
$deploymentName = "mon-appli"

Write-Host "Construction de l'image Docker..."

docker build -t $imageName ./backend

Write-Host "Push vers Docker Hub..."

docker push $imageName

Write-Host "Redémarrage du déploiement Kubernetes..."

kubectl rollout restart deployment $deploymentName

Start-Sleep -Seconds 5

Write-Host "Pods en cours..."

kubectl get pods